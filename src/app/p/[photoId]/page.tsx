import getResults from "../../../../utils/cachedImages";
import getBase64ImageUrl from "../../../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../../../utils/types";
import CarouselLayout from "../../../components/CarouselLayout";

const CarouselPage = async ({
  params: { photoId },
}: {
  params: { photoId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const results = await getResults();

  let reducedResults: ImageProps[] = [];
  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const currentPhoto: any = reducedResults.find(
    (img) => img.id === Number(photoId),
  );
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <CarouselLayout currentPhoto={currentPhoto} images={reducedResults} />
    </main>
  );
};

export default CarouselPage;

// export const getStaticProps: GetStaticProps = async (context) => {

//   return {
//     props: {
//       currentPhoto: currentPhoto,
//     },
//   };
// };

// export async function getStaticPaths() {
//   const results = await cloudinary.v2.search
//     .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
//     .sort_by("public_id", "desc")
//     .max_results(400)
//     .execute();

//   let fullPaths = [];
//   for (let i = 0; i < results.resources.length; i++) {
//     fullPaths.push({ params: { photoId: i.toString() } });
//   }

//   return {
//     paths: fullPaths,
//     fallback: false,
//   };
// }
