import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
//import { AzureBlobStorageService } from 'src/app/shared/services/azure-blob-storage.service';
import { TodoListService } from 'src/app/shared/services/todo-list.service';
import { environment } from 'src/environments/environment';
import { todoAttachment } from 'src/app/shared/models/todo-attachment';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TodoListSelectors } from 'src/app/shared/store/todo-list/todo-list-selectors';
import { AddAttachmentAction, SetAllAttachmentsAction } from 'src/app/shared/store/todo-list/todo-list-actions';
const { BlobServiceClient } = require("@azure/storage-blob");

@Component({
  selector: 'app-blob-storage',
  templateUrl: './blob-storage.component.html',
  styleUrls: ['./blob-storage.component.css']
})
export class BlobStorageComponent implements OnInit {
  fileContent: any ;
  blobServiceClient: any;
  todoListId!: string;
  private routeSub!: Subscription;
  constructor(
              private todoService: TodoListService,
              private toastr: ToastrService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private store: Store,) { }

  @Select(TodoListSelectors.Attachments) attachments$!: Observable<todoAttachment[]>
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.todoListId = params['id'];
    });
    this.getAllAttachmentsForTodoList() 
  }


  getAllAttachmentsForTodoList(){
    this.todoService.getAllAttachmentsForTodoList(this.todoListId).subscribe(
      data=> {
        this.store.dispatch(new SetAllAttachmentsAction(data))
        console.log(data);
      }, error=>{
        this.toastr.error('Error while trying to get attachments', "Error")
      }
    )
   }

  createBlobInContainer = async (event: any) => {
    const selectedFile = event.target.files[0];
    if(selectedFile){
      await this.todoService.getSas().subscribe(
        data => {
          console.log(data);
          this.blobServiceClient = new BlobServiceClient(`https://${environment.azureblobaccountname}.blob.core.windows.net/${data as string}`);
          this.toastr.success('Access token granted', 'Success');
  
          const id = uuidv4();
          const file: File = event.target.files[0];
          const containerClient = this.blobServiceClient.getContainerClient(environment.containerName);
          const blobClient = containerClient.getBlockBlobClient(id);
          const options = { blobHTTPHeaders: { blobContentType: file.type } };
          blobClient.uploadData(file, options)
  
          let attachment: todoAttachment = {
            fileName: file.name,
            id:  id,
            todoListId: this.todoListId,
          }
          this.todoService.addTodoAttachments(attachment).subscribe(
            data => {
                this.toastr.success("Successfully added file to todo list", 'Success')

                this.store.dispatch(new AddAttachmentAction(attachment))
            },
            error => {
                this.toastr.error('Error while uploading file', "Error")
            }
          )
        },
        error => {
          this.toastr.error('Permission denied', 'Error');
        }
      )
    }
    else{
      this.toastr.info('No file has been selected', 'No file');
    }   
  };

  async listAll(){
    let i = 1;
    let containers = this.blobServiceClient.listContainers();
    for await (const container of containers) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  }


  async Blobs(){
    await this.todoService.getSas().subscribe(
      data => {
        console.log(data);
        this.blobServiceClient = new BlobServiceClient(`https://${environment.azureblobaccountname}.blob.core.windows.net/${data as string}`);
        this.toastr.success('Access token granted', 'Success');
        console.log('ovdje01')

        this.listBlobs();
      },
      error => {
        this.toastr.error('Permission denied', 'Error');
      }
    )
  }


  async listBlobs(){

    console.log('ovdje')
    const containerClient = this.blobServiceClient.getContainerClient(environment.containerName);
    let i = 1;
    let blobs = containerClient.listBlobsFlat();
    console.log(blobs)
    for await (const blob of blobs) {
      console.log(`Blob ${i++}: ${blob.name}`);
    }
  }

  async downloadFile (id: string, fileName: string){
    this.todoService.getSasDownload().subscribe(
      data => {
        console.log(data);
        this.blobServiceClient = new BlobServiceClient(`https://${environment.azureblobaccountname}.blob.core.windows.net/${data as string}`);
        this.toastr.success('Access token granted', 'Success');
         //file download
         this.downloadIt(id, fileName)
      },
      error => {
        this.toastr.error('Permission denied', 'Error');
      }
    )
  
    
  }


  async downloadIt(id: string,fileName: string){
    const containerClient = this.blobServiceClient.getContainerClient(environment.containerName);
    const blobClient = await containerClient.getBlobClient(id);
    const downloadResponse = await blobClient.download();
    const blob = new Blob([await downloadResponse.blobBody]);
    const url = window.URL.createObjectURL(blob);
  
    this.http.get(url, { responseType: 'blob' }).subscribe(
      response => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(response);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
      }
    );
  }

  async deleteBlob(){

    await this.todoService.getSasDownload().subscribe(
      data => {
        console.log(data);
        this.blobServiceClient = new BlobServiceClient(`https://${environment.azureblobaccountname}.blob.core.windows.net/${data as string}`);
        this.toastr.success('Access token granted', 'Success');
         //file upload

        
        this.delete()
        
      },
      error => {
        this.toastr.error('Permission denied', 'Error');
      }
    )
  }


  async delete(){
    const options = {
      deleteSnapshots: 'include'
    }
    const containerClient = this.blobServiceClient.getContainerClient(environment.containerName);

    
    const blockBlobClient = await containerClient.getBlockBlobClient("78397d7f-0f23-4cda-8656-af6af4989361")

    await blockBlobClient.delete(options);
  }

}
