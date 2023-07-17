import { RecommendationCategory } from '@/app/type';
import httpClient from '@/http/client';

import { RecommendationBanner, RecommendationSummary } from './type';

export const getRecommendationBanners = async () => {
  const { data } = await httpClient.get<{ data: RecommendationBanner[] }>(
    '/handpyeon/api/banners/recommend',
  );

  return data.data.map(({ bannerImage, contentsNumber }) => ({
    src: bannerImage,
    url: `/recommendation/contents/${contentsNumber}`,
  }));
};

interface RecommendationListParams {
  type: RecommendationCategory;
  subType?: string;
  cursor?: number;
}

export const getRecommendationList = async (
  params: RecommendationListParams,
) => {
  const { data } = await httpClient.get<{ data: RecommendationSummary[] }>(
    '/handpyeon/api/recommends',
    { params },
  );
  return data.data;
};
