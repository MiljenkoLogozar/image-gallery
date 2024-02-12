"use client"
import { useParams } from "next/navigation";
import Carousel from "../../components/Carousel"
import { ImageProps } from "../../utils/types"

const CarouselLayout = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
    const params = useParams()
    let index = Number(params?.photoId);

    return <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
    </main>

}

export default CarouselLayout