using AutoMapper;
using Azure;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using Azure.Storage.Sas;
using Microsoft.Extensions.Azure;
using NovaLite.Todo.Apii.Dto;
using NovaLite.Todo.Apii.Interface.IServices;
using NovaLite.Todo.Core.Interface;
using NovaLite.Todo.Core.Models;

namespace NovaLite.Todo.Apii.Services
{
    public class BlobService : IBlobService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public BlobService(BlobServiceClient blobServiceClient, IUnitOfWork uow, IMapper mapper, IConfiguration config) 
        {
            _config = config;
            _uow = uow;
            _mapper = mapper;
        }
        
        public string GenerateBlobSas(string type)
        {
            string? AccountName = _config.GetSection("AzureBlob:AccountName").Value;
            string? AccountKey = _config.GetSection("AzureBlob:AccountKey").Value;
            string? ContainerName = _config.GetSection("AzureBlob:ContainerName").Value;

            Uri blobContainerUri = new(string.Format("https://{0}.blob.core.windows.net/{1}",
                AccountName, ContainerName));

            StorageSharedKeyCredential storageSharedKeyCredential =
                new(AccountName, AccountKey);

            BlobContainerClient blobContainerClient =
                new(blobContainerUri, storageSharedKeyCredential);

            Uri uri;

            //treba ovo
            if(string.Equals(type,"download"))
                uri = GetServiceSasUriForContainerDownload(blobContainerClient, type, null);
            else
                uri = GetServiceSasUriForContainer(blobContainerClient, type, null);

            return uri.Query;
        }
        private static Uri GetServiceSasUriForContainer(BlobContainerClient containerClient, string type,
                                           string storedPolicyName = null)
        {
            // Check whether this BlobContainerClient object has been authorized with Shared Key.
            if (containerClient.CanGenerateSasUri)
            {
                // Create a SAS token that's valid for one hour.
                BlobSasBuilder sasBuilder = new BlobSasBuilder()
                {
                    BlobContainerName = containerClient.Name,
                    Protocol = SasProtocol.Https,
                    Resource = "c"
                };

                if (storedPolicyName == null)
                {
                    sasBuilder.ExpiresOn = DateTimeOffset.UtcNow.AddSeconds(30);
                    sasBuilder.SetPermissions(BlobContainerSasPermissions.Write);

                    //sasBuilder.SetPermissions(BlobContainerSasPermissions.All);
                }
                else
                {
                    sasBuilder.Identifier = storedPolicyName;
                }

                Uri sasUri = containerClient.GenerateSasUri(sasBuilder);
                Console.WriteLine("SAS URI for blob container is: {0}", sasUri);
                Console.WriteLine();

                return sasUri;
            }
            else
            {
                Console.WriteLine(@"BlobContainerClient must be authorized with Shared Key 
                          credentials to create a service SAS.");
                return null;
            }
        }

        private static Uri GetServiceSasUriForContainerDownload(BlobContainerClient containerClient, string type,
                                           string storedPolicyName = null)
        {
            // Check whether this BlobContainerClient object has been authorized with Shared Key.
            if (containerClient.CanGenerateSasUri)
            {
                // Create a SAS token that's valid for one hour.
                BlobSasBuilder sasBuilder = new BlobSasBuilder()
                {
                    BlobContainerName = containerClient.Name,
                    Protocol = SasProtocol.Https,
                    Resource = "c"
                };

                if (storedPolicyName == null)
                {
                    sasBuilder.ExpiresOn = DateTimeOffset.UtcNow.AddSeconds(30);
                    sasBuilder.SetPermissions(BlobContainerSasPermissions.Read);

                    //sasBuilder.SetPermissions(BlobContainerSasPermissions.All);
                }
                else
                {
                    sasBuilder.Identifier = storedPolicyName;
                }

                Uri sasUri = containerClient.GenerateSasUri(sasBuilder);
                Console.WriteLine("SAS URI for blob container is: {0}", sasUri);
                Console.WriteLine();

                return sasUri;
            }
            else
            {
                Console.WriteLine(@"BlobContainerClient must be authorized with Shared Key 
                          credentials to create a service SAS.");
                return null;
            }
        }

    }
}
