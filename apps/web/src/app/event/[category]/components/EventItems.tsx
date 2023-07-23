'use client';
import { PromotionGoodsCategory } from '@/apis/type';
import { EventType, type Convenience } from '@/app/type';
import EventItemCard from '@/components/EventItemCard';
import { EventMapping } from '@/constants/conveniences';
import { useGetPromotionGoods } from '@/hooks/query/usePromotion';
import React from 'react';

interface EventItemsProps {
  category: Convenience;
  eventType: EventType;
}

const mappingSegments: Record<PromotionGoodsCategory, Convenience> = {
  ALL: 'ALL',
  CU: 'CU',
  GS25: 'GS25',
  SEVEN11: '7Eleven',
  EMART24: 'Emart24',
} as const;

const EventItems = ({ category, eventType }: EventItemsProps) => {
  const { data } = useGetPromotionGoods({
    type: EventMapping[category],
    promotionType: eventType,
  });
  return (
    <div className="flex flex-wrap items-start justify-start gap-x-[18px] gap-y-[50px]">
      {data?.map((promotion, idx) => (
        <EventItemCard
          key={`${idx}-${promotion.goodsNo}`}
          eventItem={{
            eventType: promotion.promotionType,
            imageUrl: promotion.goodsImageUrl,
            price: promotion.goodsPrice,
            title: promotion.goodsName,
            goodsNo: promotion.goodsNo,
            convenience: mappingSegments[promotion.storeName],
          }}
        />
      ))}
    </div>
  );
};

const EventItemsSkeleton = () => {
  return (
    <div className="mb-[50px] flex flex-wrap items-start justify-start gap-x-[18px] gap-y-[50px]">
      {Array.from({ length: 8 }, (_, i) => i).map((_, k) => (
        <EventItemCard.Skeleton key={k} />
      ))}
    </div>
  );
};

EventItems.Skeleton = EventItemsSkeleton;

export default EventItems;
