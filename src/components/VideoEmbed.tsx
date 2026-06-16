function getYoutubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return m?.[1] ?? null
}

export function VideoEmbed({ url }: { url: string }) {
  const id = getYoutubeId(url)
  if (!id) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="text-sm text-emerald-400 hover:text-emerald-300 underline">
        Abrir video
      </a>
    )
  }
  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="Video del ejercicio"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}
