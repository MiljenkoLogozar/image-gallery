"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import { ImageProps } from "../utils/types";
import Modal from "./Modal";
import Image from "next/image";
import Link from "next/link";
import Bridge from "./Icons/Bridge";
import Logo from "./Icons/Logo";

const HomeLayout = ({ images }: { images: ImageProps[] }) => {
    const searchParams = useSearchParams();

    const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

    const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null as any);

    useEffect(() => {
        console.log("HomeLayout photoId", searchParams.get("photoId"));

        // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
        if (lastViewedPhoto && !searchParams.get("photoId")) {
            lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
            setLastViewedPhoto(null);
        }
    }, [searchParams.get("photoId"), lastViewedPhoto, setLastViewedPhoto]);

    return (
        <>
            <main className="mx-auto max-w-[1960px] p-4">
                {searchParams.get("photoId") && (
                    <Modal
                        images={images}
                        onClose={() => {
                            setLastViewedPhoto(searchParams.get("photoId") as any);
                        }}
                    />
                )}
                <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                    <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            <span className="flex max-h-full max-w-full items-center justify-center">
                                <Bridge />
                            </span>
                            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
                        </div>
                        <Logo />
                        <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
                            2022 Event Photos
                        </h1>
                        <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
                            Our incredible Next.js community got together in San Francisco for
                            our first ever in-person conference!
                        </p>
                        <a
                            className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                            href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Clone and Deploy
                        </a>
                    </div>
                    {images?.map(({ id, public_id, format, blurDataUrl }) => (
                        <Link
                            key={id}
                            href={`/?photoId=${id}`}
                            // as={`/p/${id}`}
                            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                            shallow
                            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                        >
                            <Image
                                alt="Next.js Conf photo"
                                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                                style={{ transform: "translate3d(0, 0, 0)" }}
                                placeholder="blur"
                                blurDataURL={blurDataUrl}
                                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                                width={720}
                                height={480}
                                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                            />
                        </Link>
                    ))}
                </div>
            </main>
            <footer className="p-6 text-center text-white/80 sm:p-12">
                Thank you to{" "}
                <a
                    href="https://edelsonphotography.com/"
                    target="_blank"
                    className="font-semibold hover:text-white"
                    rel="noreferrer"
                >
                    Josh Edelson
                </a>
                ,{" "}
                <a
                    href="https://www.newrevmedia.com/"
                    target="_blank"
                    className="font-semibold hover:text-white"
                    rel="noreferrer"
                >
                    Jenny Morgan
                </a>
                , and{" "}
                <a
                    href="https://www.garysextonphotography.com/"
                    target="_blank"
                    className="font-semibold hover:text-white"
                    rel="noreferrer"
                >
                    Gary Sexton
                </a>{" "}
                for the pictures.
            </footer>
        </>
    );
};

export default HomeLayout;