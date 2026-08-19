import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (buffer: Buffer): Promise<string> => {

    return new Promise((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(
                {
                    folder: "olx-ecommerce-products"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result!.secure_url);
                    }
                }
            );

        uploadStream.end(buffer);
    });
};