const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const azureStorageKey = process.env.AZURE_STORAGE_KEY;
    const containerName = 'test';

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const code = req.body.code;
    const fileName = `${Date.now()}.c`;

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const uploadBlobResponse = await blockBlobClient.upload(code, code.length);

    if (uploadBlobResponse._response.status === 201) {
        context.res = {
            status: 200,
            body: 'Code uploaded successfully'
        };
    } else {
        context.res = {
            status: 500,
            body: 'Failed to upload code'
        };
    }
};
