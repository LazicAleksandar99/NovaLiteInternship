import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class AzureBlobStorageService {
//DefaultEndpointsProtocol=https;AccountName=novaliteinternship;AccountKey=agRKEXteAZoOk/G1NkDVPpvvgGWMBmzsUm1eXC44bNytYIbCD4bJCXQjryhcIfpm+hl+paDqCfg0+AStbLq+qA==;EndpointSuffix=core.windows.net
  accountName: string = "novaliteinternship"
  containerName: string = 'container-e249ffe4-235b-4f13-b586-58bd16eb9fa2'

  // account: string  = "<account name>";
  // sas: string = "<service Shared Access Signature Token>";
  
  // blobServiceClient = new BlobServiceClient(`https://${this.account}.blob.core.windows.net${this.sas}`);
  constructor() { }
  
  public async listItems(): Promise<string[]>{
    let result: string[] = [];

    let blobs = this.containerClient().listBlobsFlat();
    for await (const blob of blobs) {
      result.push(blob.name);
    }
    return result;
  }

  // public downloadImage(sas: string, name: string, handler: (blob: Blob) => void) {
  //   this.downloadBlob(name, this.containerClient(sas), handler)
  // }
//test.txt?sv=2021-12-02&se=2023-03-28T15%3A54%3A52Z&sr=b&sp=r&sig=aVCnFUWMYoavTOcHLYKcgSJy20QUhfWNOSYZga0PJMw%3D"
  private containerClient(): ContainerClient {
    return new BlobServiceClient(`https://${this.accountName}.blob.core.windows.net` +"sv=2021-12-02&se=2023-03-28T15%3A54%3A52Z&sr=b&sp=r&sig=aVCnFUWMYoavTOcHLYKcgSJy20QUhfWNOSYZga0PJMw%3D")
               .getContainerClient(this.containerName);
  }
}
