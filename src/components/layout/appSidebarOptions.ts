import { ContactRound, BriefcaseBusiness, BicepsFlexed } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const useAppSidebarOptions = () => {
  const t = useTranslations('AppSidebarOptions');
  return {
    navMain: [
      {
        group: t('clients'),
        menus: [
          {
            title: t('clientsManagement'),
            url: '#',
            icon: ContactRound,
            isActive: true,
            items: [
              {
                title: t('dataDocs'),
                url: '#',
              },
              {
                title: t('clientsAttendance'),
                url: '#',
              },
            ],
          },
        ],
      },
      {
        group: t('staff'),
        menus: [
          {
            title: t('staffManagement'),
            url: '#',
            icon: BriefcaseBusiness,
            isActive: true,
            items: [
              {
                title: t('dataDocs'),
                url: '#',
              },
              {
                title: t('staffAssignation'),
                url: '#',
              },
              {
                title: t('staffAttendance'),
                url: '#',
              },
              {
                title: t('staffVacation'),
                url: '#',
              },
              {
                title: t('salaryPayments'),
                url: '#',
              },
            ],
          },
        ],
      },
      {
        group: t('services'),
        menus: [
          {
            title: t('servicesManagement'),
            url: '#',
            icon: BicepsFlexed,
            isActive: true,
            items: [
              {
                title: t('servicesCatalog'),
                url: '#',
              },
              {
                title: t('servicesSchedules'),
                url: '#',
              },
              {
                title: t('servicesRegistration'),
                url: '#',
              },
              {
                title: t('servicesPayments'),
                url: '#',
              },
            ],
          },
        ],
      },
    ],
  };
};
