"use client";

import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import PropertyCard from "@/components/PropertyCard";
import { getProperties, propertyGrid, type Property } from "@/lib/properties";
import { supabase } from "@/lib/supabase";

export function PropertyExplorer({ initialProperties = propertyGrid }: { initialProperties?: Property[] }) {
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Property | null>(null);
  const [slide, setSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let mounted = true;
    const refreshProperties = () => {
      setLoading(true);
      getProperties()
        .then((data) => {
          if (mounted) {
            setProperties(data.length ? data : initialProperties);
          }
        })
        .catch((loadError) => {
          if (mounted) {
            setError(loadError instanceof Error ? loadError.message : "Could not load properties.");
          }
        })
        .finally(() => {
          if (mounted) {
            setLoading(false);
          }
        });
    };

    setLoading(true);
    refreshProperties();

    const channel = supabase
      ?.channel("public-properties")
      .on("postgres_changes", { event: "*", schema: "public", table: "properties" }, refreshProperties)
      .subscribe();

    return () => {
      mounted = false;
      if (channel) {
        supabase?.removeChannel(channel);
      }
    };
  }, [initialProperties]);

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const matchesQuery = `${property.title} ${property.location} ${property.features.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesQuery;
    });
  }, [properties, query]);

  const propertiesPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / propertiesPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const openProperty = (property: Property) => {
    setSelected(property);
    setSlide(0);
  };

  const mediaItems = useMemo(() => {
    if (!selected) return [];
    const items: { type: "image" | "video"; url: string }[] = [];

    if (selected.gallery && selected.gallery.length > 0) {
      selected.gallery.filter(Boolean).forEach((url) => {
        items.push({ type: "image", url });
      });
    } else if (selected.image) {
      items.push({ type: "image", url: selected.image });
    }

    if (selected.videos && selected.videos.length > 0) {
      selected.videos.filter(Boolean).forEach((url) => {
        items.push({ type: "video", url });
      });
    }

    return items;
  }, [selected]);

  const currentMedia = mediaItems[slide];

  useEffect(() => {
    if (currentMedia?.type === "video") {
      setIsPlaying(true);
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.log("Autoplay was prevented:", err);
            setIsPlaying(false);
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [currentMedia]);

  const togglePlayPause = () => {
    if (currentMedia?.type !== "video" || !videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Could not play video:", err);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full max-w-xl">
          <span className="sr-only">Search Properties</span>
          <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-forest" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Properties..."
            className="h-14 w-full rounded-lg border border-black/15 bg-white px-5 pr-12 text-sm shadow-sm outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/20"
          />
        </label>
        <div className="flex flex-wrap gap-2" />
      </div>

      {error ? <p className="mt-5 rounded bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.length ? (
          filtered.slice((currentPage - 1) * propertiesPerPage, currentPage * propertiesPerPage).map((property) => (
            <PropertyCard key={property.id} property={property} onView={openProperty} />
          ))
        ) : (
          <div className="rounded-lg border border-black/10 bg-white p-6 text-sm font-bold text-ink/60 sm:col-span-2 lg:col-span-4">
            No properties match your search.
          </div>
        )}
      </div>

      {filtered.length > 8 && (
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded text-sm font-black transition ${
                page === currentPage ? "bg-forest text-white" : "text-forest hover:bg-forest/10"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {selected && currentMedia ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded bg-white text-forest shadow transition hover:bg-forest hover:text-white"
              aria-label="Close property gallery"
            >
              <X className="h-5 w-5" />
            </button>
            <div 
              className="relative aspect-[16/10] bg-slate-950 flex items-center justify-center cursor-pointer select-none"
              onClick={togglePlayPause}
            >
              {currentMedia.type === "video" ? (
                <video
                  ref={videoRef}
                  src={currentMedia.url}
                  loop
                  muted={isMuted}
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <Image src={currentMedia.url} alt={selected.title} fill className="object-cover" sizes="90vw" />
              )}

              {/* Play/Pause overlay */}
              {currentMedia.type === "video" && !isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/35 animate-fade-in">
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Mute/Unmute audio toggle */}
              {currentMedia.type === "video" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  className="absolute right-4 bottom-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 hover:scale-105 shadow"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              )}

              {/* Navigation arrows */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlide((s) => (s === 0 ? mediaItems.length - 1 : s - 1));
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80 hover:scale-105 shadow-md"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlide((s) => (s === mediaItems.length - 1 ? 0 : s + 1));
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80 hover:scale-105 shadow-md"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-black text-forest">{selected.title}</h3>
                <p className="mt-1 text-sm font-semibold text-ink/70">
                  {selected.location} · {selected.price}
                </p>
                {selected.description && (
                  <p className="mt-3 text-sm text-ink/80 leading-relaxed">
                    {selected.description}
                  </p>
                )}
              </div>
              
              {/* Cropped Thumbnail Carousel */}
              <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 max-w-full sm:max-w-[480px] scrollbar-thin scrollbar-thumb-forest/20 scrollbar-track-transparent">
                {mediaItems.map((item, index) => (
                  <button
                    key={item.url + index}
                    onClick={() => setSlide(index)}
                    className={`relative flex-shrink-0 h-12 w-20 rounded-md overflow-hidden border-2 transition-all ${
                      slide === index
                        ? "border-forest ring-2 ring-forest/20 scale-105"
                        : "border-black/10 hover:border-forest/50"
                    }`}
                    aria-label={`Go to media ${index + 1}`}
                  >
                    {item.type === "video" ? (
                      <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                        <video src={item.url} className="absolute inset-0 w-full h-full object-cover opacity-60" muted playsInline />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-4 w-4 text-white fill-current animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <Image src={item.url} alt="" fill className="object-cover" sizes="80px" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
