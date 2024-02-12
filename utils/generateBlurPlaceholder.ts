import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import type { ImageProps } from "./types";

const cache = new Map<ImageProps, string>();

export default async function getBase64ImageUrl(
  image: ImageProps,
): Promise<string> {
  let url = cache.get(image);
  console.log("getBase64ImageUrl url", url, image);

  if (url) {
    return url;
  }
  const fetchUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
  console.log("fetchUrl", fetchUrl);
  const response = await fetch(fetchUrl);
  console.log("response", response.status);

  const buffer = await response.arrayBuffer();
  console.log("buffer", buffer);

  // const minified = await imagemin.buffer(Buffer.from(buffer), {
  //   plugins: [imageminJpegtran()],
  // });

  // console.log("minified",minified);
  

  // url = `data:image/jpeg;base64,${Buffer.from(minified).toString("base64")}`;
  // cache.set(image, url);
  // return url;
  return fetchUrl
}
