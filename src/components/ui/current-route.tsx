'use client';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function CurrentRoute({ pathSegments }: { pathSegments: string[] }) {
  const t = useTranslations('CurrentRouteComponent');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem
                className={cn(`${!isLast ? 'hidden md:block' : ''}`)}
              >
                <BreadcrumbPage>{t(segment)}</BreadcrumbPage>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
