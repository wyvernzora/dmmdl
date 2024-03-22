export type SeriesId = string;
export type ContentId = string;

export interface NamedEntity {
  id: string;
  name: string;
}

export interface SeriesMetadata {
  title: string;
  media: string;
  series_id: number;
}

export interface ContentMetadata {
  title: string;
  author: Array<NamedEntity>;
  publisher: NamedEntity;
  label: NamedEntity;
  category: NamedEntity;
  volume_number: number;
  genre: Array<NamedEntity>;
  synopsis: string;
  file_info: {
    total_pages: number;
    content_publish_date: string;
  };
  purchased: {
    purchased_date: string;
  };
  sell: {
    product_id: ContentId;
  };
}

export async function getMetadata(): Promise<string> {
  const bm = await getBookMetadata();
  const sm = await getSeriesMetadata();
  console.log(bm, sm);

  return JSON.stringify(
    {
      title: bm.title,
      titleSort: sm.title + " " + String(bm.volume_number).padStart(3, "0"),
      authors: bm.author.map((i) => i.name).join("&"),
      publisher: bm.publisher.name,
      publishedAt: bm.file_info.content_publish_date,
      comment: bm.synopsis,
      identifier: `dmm:${sm.series_id}/${bm.sell.product_id}`,
      language: "jpn",
      tags: bm.genre.map((i) => i.name).join(","),
      series: sm.title,
      index: bm.volume_number,
    },
    null,
    2,
  );
}

export async function getBookMetadata(): Promise<ContentMetadata> {
  const response = await fetch(
    `https://book.dmm.com/ajax/bff/content/?shop_name=general&content_id=${getBookIds().contentId}`,
  );
  if (!response.ok) {
    console.log(response.json());
    throw new Error(
      `failed to get book metadata: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

export async function getSeriesMetadata(): Promise<any> {
  const response = await fetch(
    `https://book.dmm.com/ajax/bff/series/?shop_name=general&series_id=${getBookIds().seriesId}`,
  );
  if (!response.ok) {
    console.log(response.json());
    throw new Error(
      `failed to get series metadata: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

interface BookIdentifiers {
  seriesId: SeriesId;
  contentId: ContentId;
}

function getBookIds(): BookIdentifiers {
  // This is obviously a hack, but getting to the book ID (or content ID) is not exactly trivial
  // For now, the last segment of the URL seems to be bookId
  const closeAfterUrl =
    NFBR.a6G.Initializer.views_.renderer.model.get("closeAfterAddress");
  const segments = closeAfterUrl
    .split("/")
    .filter((i) => i)
    .reverse();
  return { contentId: segments[0], seriesId: segments[1] };
}
