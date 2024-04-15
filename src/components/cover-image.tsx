import Image from "next/image";

interface CoverImageProps {
  title: string; // Assuming you might use title for aria-label or similar attribute
  src: string;
  alt: string;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { title, src, alt, priority } = props;

  const imageContent = src ? (
    <Image
      className="h-auto w-full rounded-lg shadow-lg"
      width={2000}
      height={1000}
      alt={alt || ""}
      src={src || ""}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "50%" }}>No image available</div>
  );

  return (
    <div className="shadow-md transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
      {imageContent}
    </div>
  );
}
