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

const pathSegments = (pathname: string) => {
  return pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment).replace(/-/g, ' '));
};

export function CurrentRoute({ fullPath }: { fullPath: string }) {
  const t = useTranslations('CurrentRouteComponent');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments(fullPath).map((segment, index) => {
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
