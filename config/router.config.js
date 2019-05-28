export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    authority: ['admin', 'user'],
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/storage/upload' },
      { path: '/dashboard', redirect: '/storage/upload' },
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   routes: [
      //     { path: '/dashboard', redirect: '/dashboard/analysis' },
      //     {
      //       path: '/dashboard/analysis',
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //     },
      //     {
      //       path: '/dashboard/monitor',
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //     },
      //     {
      //       path: '/dashboard/workplace',
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //     },
      //   ],
      // },

      //Upload A File
      {
        path: '/storage/upload',
        name: 'Upload Files',
        icon: 'upload',
        component: './Storage/Upload',
      },
      //Download A File
      {
        path: '/storage/download',
        name: 'Download Files',
        icon: 'download',
        component: './Storage/Download',
      },

      // //List of Certificates
      // {
      //   path: '/storage',
      //   name: 'storage',
      //   icon: 'table',
      //   routes: [
      //     { path: '/storage', redirect: '/storage/upload' },
      //     //Upload A File
      //     {
      //       path: '/storage/upload',
      //       name: 'Upload Files',
      //       icon: 'upload',
      //       component: './Storage/Upload',
      //     },
      //     //Download A File
      //     {
      //       path: '/storage/download',
      //       name: 'Download Files',
      //       icon: 'download',
      //       component: './Storage/Download',
      //     }
      //   ]
      // },
      // //List of Revoked Certificates
      // {
      //   path: '/list/search/revokedCertificateslist',
      //   name: 'List of Revoked Certificates',
      //   icon: 'ordered-list',
      //   component: './List/RevokedCertificateCardList',
      // },
      {
        component: '404',
      },
    ],
  },
];






      //      forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
//      list
      // {  
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/participantslist',
      //       name: 'List of Participants',
      //       icon: 'ordered-list',
      //       component: './List/ParticipantList',
      //     },
      //     {
      //       path: '/list/search/certificateslist',
      //       name: 'List of Certificates',
      //       icon: 'ordered-list',
      //       component: './List/CertificateCardList',
      //     },
      //     {
      //       path: '/list/search/revokedCertificateslist',
      //       name: 'List of Revoked Certificates',
      //       icon: 'ordered-list',
      //       component: './List/RevokedCertificateCardList',
      //     },
      //     {
      //       path: '/list/table-list1',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },          {
      //       path: '/list/basic-list',
      //       name: 'basiclist',
      //       component: './List/BasicList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //     {
      //       path: '/list/search',
      //       name: 'searchlist',
      //       component: './List/List',
      //       routes: [
      //         {
      //           path: '/list/search',
      //           redirect: '/list/search/articles',
      //         },
      //         {
      //           path: '/list/search/articles',
      //           name: 'articles',
      //           component: './List/Articles',
      //         },
      //         {
      //           path: '/list/search/projects',
      //           name: 'projects',
      //           component: './List/Projects',
      //         },
      //           {
      //             path: '/list/search/applications',
      //             name: 'applications',
      //             component: './List/Applications',
      //           },
      //       ],
      //     },
      //   ],
      // },

      // forms
      // {
      //   path: '/form',
      //   icon: 'form',
      //   name: 'form',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'basicform',
      //       component: './Forms/BasicForm',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'stepform',
      //       component: './Forms/StepForm',
      //       hideChildrenInMenu: true,
      //       routes: [
      //         {
      //           path: '/form/step-form',
      //           redirect: '/form/step-form/info',
      //         },
      //         {
      //           path: '/form/step-form/info',
      //           name: 'info',
      //           component: './Forms/StepForm/Step1',
      //         },
      //         {
      //           path: '/form/step-form/confirm',
      //           name: 'confirm',
      //           component: './Forms/StepForm/Step2',
      //         },
      //         {
      //           path: '/form/step-form/result',
      //           name: 'result',
      //           component: './Forms/StepForm/Step3',
      //         },
      //       ],
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'advancedform',
      //       authority: ['admin'],
      //       component: './Forms/AdvancedForm',
      //     },
      //   ],
      // },
      // list
