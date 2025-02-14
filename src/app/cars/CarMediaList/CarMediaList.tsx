import { useCallback, useEffect, useState } from "react";

import Image from "next/image";

import CarMediaListSkeleton from "@/cars/CarMediaList/CarMediaListSkeleton";

import type { CarMediaListProps } from ".";

export default function CarMediaList({ mediaList }: CarMediaListProps) {
  const [selectedMediaPath, setSelectedMediaPath] = useState<string | null>(
    null,
  );

  const handleSelectMedia = useCallback(
    (path: string) => () => {
      setSelectedMediaPath(path);
    },
    [],
  );

  useEffect(() => {
    if (!selectedMediaPath && !!mediaList?.length) {
      const thumbnailMedia = mediaList.find((item) => !!item.is_thumbnail);
      if (thumbnailMedia) setSelectedMediaPath(thumbnailMedia.path);
    }
  }, [handleSelectMedia, mediaList, selectedMediaPath]);

  if (!selectedMediaPath) return <CarMediaListSkeleton />;

  return (
    <div className="flex flex-col gap-2 flex-1">
      <Image
        className="overflow-hidden"
        width={785}
        height={442}
        src={selectedMediaPath}
        alt="media thumbnail"
      />
      <ul className="flex flex-wrap gap-1">
        {(mediaList ?? []).map((media, index) => (
          <li key={media.id}>
            <button onClick={handleSelectMedia(media.path)}>
              <Image
                className="overflow-hidden"
                width={115}
                height={65}
                src={media.path}
                alt={`media preview number ${index + 1}`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
