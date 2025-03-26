import { ContactRound, BriefcaseBusiness, BicepsFlexed } from 'lucide-react';

export const appSidebarOptions = {
  navMain: [
    {
      group: 'Clientes',
      menus: [
        {
          title: 'Gestión de Clientes',
          url: '#',
          icon: ContactRound,
          isActive: true,
          items: [
            {
              title: 'Datos & Documentación',
              url: '#',
            },
            {
              title: 'Registro de Asistencia',
              url: '#',
            },
          ],
        },
      ],
    },
    {
      group: 'Personal',
      menus: [
        {
          title: 'Gestión de Personal',
          url: '#',
          icon: BriefcaseBusiness,
          isActive: true,
          items: [
            {
              title: 'Datos & Documentación',
              url: '#',
            },
            {
              title: 'Asignación a Servicios',
              url: '#',
            },
            {
              title: 'Registro de Asistencia',
              url: '#',
            },
            {
              title: 'Registro de Vacaciones',
              url: '#',
            },
            {
              title: 'Pago de Salarios',
              url: '#',
            },
          ],
        },
      ],
    },
    {
      group: 'Servicios',
      menus: [
        {
          title: 'Gestión de Servicios',
          url: '#',
          icon: BicepsFlexed,
          isActive: true,
          items: [
            {
              title: 'Catálogo de Servicios',
              url: '#',
            },
            {
              title: 'Registro de Horarios',
              url: '#',
            },
            {
              title: 'Inscripción en Servicios',
              url: '#',
            },
            {
              title: 'Pagos de Clientes por Servicios',
              url: '#',
            },
          ],
        },
      ],
    },
  ],
};
