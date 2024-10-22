"use server";

import { prisma } from "@/db";
import { options } from "@/options";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
// import { File } from "buffer";
import { v2 as cloudinary } from "cloudinary";
// import { PrismaClient } from "@prisma/client";
import streamifier from "streamifier";
// import { Readable } from "stream";

// export async function addProduct(prevState: unknown, formData: FormData) {
//     // Add product logic here
//     const session = await getServerSession(options)
//     if (session?.user?.email !== "tamangteppiche@gmail.com") {
//         throw new Error("Unauthorized")
//     }

//     //if (session?.user?.email !== "admin@example.com") {
//     //throw new Error("Unauthorized")} yesari tamangteppiche@gmail.com vaye matra accesss dina milcha

//     const product =  await prisma.product.create({
//         data: {

//         }
//     })

// }

// export async function POST(request: NextRequest)  {

//     const session = await getServerSession(options)
//     if (session?.user?.email !== "tamangteppiche@example.com") {
//         throw new Error("Unauthorized")
//     }

//     const body = await request.json()
//     const product =  await prisma.product.create({
//         data: {
//             name: body.name,
//             price: body.price,
//         }
//     })
// }

//handleing image upload so that we can upload image to cloudinary
//and have single action for image upload and create product

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })
// //Click view API keys bata liyeera ..env file ma rakhera yeta process.env vanera use gareko for security
// async function uploadFile(formData: FormData) {
//     const file = formData.get("image")

//     if(file instanceof File) {
//         const aarayBuffer = await file.arrayBuffer()
//         const buffer = Buffer.from(aarayBuffer)

//         const stream = cloudinary.uploader.upload_stream({}, async (error, result) => {
//             if(error || !result) {
//                 throw new Error("failded to upload image")

//             }
//             //console.log({result})
//             await prisma.product.create({
//                 data: {
//                     name: formData.get("name") as string,
//                     price: Number(formData.get("price")),
//                     image: result.secure_url,
//                     size: formData.get("size") as string,
//                     stock: Number(formData.get("stock"))

//                 }
//             })
//             revalidatePath("/")
//             revalidatePath("/admin/products")
//             return{message:"Product created", success:true}

//         })
//         streamifier.createReadStream(buffer).pipe(stream)
//     }

// }

// export async function createProduct(initialState: unknown, formData: FormData) {
//     const session = await getServerSession(options)
//     if (session?.user?.email !== "tamangteppiche@gmail.com") {
//         throw new Error("Unauthorized")
//     }

//     const product = formData.get("name")
//     const price = formData.get("price")
//     const image = formData.get("image")
//     const size = formData.get("size")
//     try {
//         await prisma.product.create({
//             data: {
//                 name: product as string,
//                 price: Number(price),
//                 image: image as string,
//                 size: size as string
//             }
//         })
//         revalidatePath("/")
//         revalidatePath("/admin/products")
//         return{message:"Product created", success:true}
//     } catch (error) {
//         console.log(error)
//         return{message:"Product not created", success:false}
//     }
// }

//get products in admin page to list all the products
export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return { success: products }; //like this we can getProducts with products.success in listProduct.tsx
  } catch (error) {
    console.error("failded to get products", error);
  }
};

// console.log(
//   "Cloudinary",
//   process.env.CLOUD_NAME,
//   process.env.CLOUD_API_KEY,
//   process.env.CLOUD_API_SECRET
// );

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Helper function to upload a single image to Cloudinary
// async function uploadToCloudinary(file: File): Promise<string> {
//   return new Promise(async (resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream({}, (error, result) => {
//       if (error) {
//         reject(error);
//       } else if (result) {
//         resolve(result.secure_url);
//       }
//     });
//     const readableStream = new Readable();
//     readableStream.push(Buffer.from(await file.arrayBuffer()));
//     readableStream.push(null);
//     readableStream.pipe(stream);
//   });
// }

async function uploadToCloudinary(buffer: ArrayBuffer): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({}, (error, result) => {
      if (error) {
        reject(error);
      } else if (result) {
        resolve(result.secure_url);
      }
    });
    streamifier.createReadStream(Buffer.from(buffer)).pipe(stream);
  });
}

export async function createProductWithImages(formData: FormData) {
  //const session = await getServerSession(options)
  // if (session?.user?.email !== "tamangteppiche@gmail.com") {
  //     throw new Error("Unauthorized")
  // }      admin page ma jana nadiyepaxi yo sabaitira code lekhirahanu naparla.

  try {
    const name = formData.get("name");
    const price = parseInt(formData.get("price") as string);
    const description = formData.get("description");
    const color = formData.get("color");
    const category = formData.get("category");
    const size = formData.get("size");
    const stock = parseInt(formData.get("stock") as string);
    const brand = formData.get("brand");
    const id = formData.get("id");

    // const mainImage = formData.get("mainImage") as File;

    // const mainImageUrl = await uploadToCloudinary(mainImage);

    // const detailedImages = formData.get("detailedImages") as File;
    // const detailImageUrls = await uploadToCloudinary(detailedImages);
    // const detailedImagesUrl = detailImageUrls
    //   .split(",")
    //   .map((url) => url.trim())
    //   .join(",");

    const mainImage = formData.get("mainImage") as File;
    const detailedImages = formData.getAll("detailedImages") as File[];

    const mainImageUrl = await uploadToCloudinary(
      await mainImage.arrayBuffer()
    );

    const detailedImagesUrl = await Promise.all(
      detailedImages.map(async (image) =>
        uploadToCloudinary(await image.arrayBuffer())
      )
    );

    const product = await prisma.product.create({
      data: {
        name: name as string,
        price: Number(price),
        size: size as string,
        stock: Number(stock),
        description: description as string,
        color: color as string,
        category: category as string,
        brand: brand as string,
        id: id as string,

        imagePath: mainImageUrl,
        filePath: detailedImagesUrl.join(","),
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/products");
    return { message: "Product created", success: true, product };
  } catch (error) {
    console.log(error);
    return { message: "Product not created", success: false };
  }
}
