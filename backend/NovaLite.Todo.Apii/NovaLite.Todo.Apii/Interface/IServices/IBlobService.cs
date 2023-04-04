using Azure.Storage.Blobs;
using NovaLite.Todo.Apii.Dto;

namespace NovaLite.Todo.Apii.Interface.IServices
{
    public interface IBlobService
    {
        //string GenerateAccountSas();
        string GenerateBlobSas(string type);
    }   
}
