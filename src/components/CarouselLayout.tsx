"use client"
import { useParams, useSearchParams } from "next/navigation";
import Carousel from "../../components/Carousel"
import { ImageProps } from "../../utils/types"

const CarouselLayout = ({ currentPhoto }: { currentPhoto: ImageProps, images: ImageProps[] }) => {
    const searchParams = useSearchParams()
    let index = Number(searchParams.get("photoId"));
    console.log("CarouselLayout index", index);

    return <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
    </main>

}

export default CarouselLayout