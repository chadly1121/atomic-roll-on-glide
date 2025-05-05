
import { GalleryImage } from './types';

// Using direct image URLs from your shared Google Photos links
export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNhIBJdvRX0hzC_9-XI1MTXdRrtcV_XUc50J3LUvIsb3STmZKLHfMg4G8MR50LwZn56jvEkDU6tU6bzfcwFNIXLVAbwgdfO2TShV-GuceFYPejC1Pk=w2400", 
    category: "interior",
    title: "Interior Painting Project"
  },
  {
    id: 2,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNbgiqiTSrZO0Gg2exHO8bDKmKDbrb6ZuUGphvWYBCRbfSUvExyrhTRnio4Qgf6MCPZveTh7-Qhb5wUw2IUfudNJqOQoJQfbYACBPKVeqq1jY3z4a8=w2400", 
    category: "exterior",
    title: "Exterior Home Transformation"
  },
  {
    id: 3,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPnuKfdHxsNLEcOOjiuw1jrH1PzKz0A1RTXfFiSV9LZxvUvdf2KI9dsQrh4MdqA1TO6Jgx8bTISjGDJCCflJad3Iah-wGZBxzk2-JrO-mZaeuPJuZ0=w2400", 
    category: "interior",
    title: "Kitchen Cabinet Refinishing"
  },
  {
    id: 4,
    src: "https://lh3.googleusercontent.com/pw/AP1GczMXsm2FCF1mxlCL2FyPi9T8VB8uEsk-p-cgmLzkCPy5xXHK_b-9t5iljiBYdMdonnx7oTqNaXTgUobUg3zpJx5OIWOru5pjE-Bk8wGJOj4iZpmaGDM=w2400", 
    category: "exterior",
    title: "Deck Transformation"
  },
  {
    id: 5,
    src: "https://lh3.googleusercontent.com/pw/AP1GczM7wLK9caudK-p7CJs8N1P4LrMbkQ0q0YLu-KIyhduBC3Tok08vxNM4x65UiOpuBVn2432p88LBxrHwOpktOqcStq6cu12Oj-no1KN4mLswtwdKd7c=w2400",
    category: "commercial",
    title: "Commercial Project"
  },
  {
    id: 6,
    src: "https://lh3.googleusercontent.com/pw/AP1GczOcULO5ByttswlWwLQiYkOtgFeT0cMa33ICj8Omh7BulP-zZ2BE2t5D4_dypSkv3Yg3G6aJZBj-ihLJahwQH8zP3nqQgJgn9YsMusqtNq8FWEoegYE=w2400",
    category: "interior",
    title: "Living Room Refresh"
  },
  {
    id: 7,
    src: "https://lh3.googleusercontent.com/pw/AP1GczM-XazT6A9OuFhdDlpD1tSLZb0s-_mCxJJvZ5GaRWYOCcr7Bo1yvtP0MRD_LwM1PSWDwbhcbT-jSZHNdACkB2ZzzaL0DzSuYacB7oJJoFqL4MKmA8U=w2400",
    category: "interior",
    title: "Interior Transformation"
  },
  {
    id: 8,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPviA4cwqiRQgKl_9pnQMMO44BJUV-ZA4owFREafzBgEGYQou7N1hJipQPZXyVe5Xf_cngJ8AEFPR_9YrDefzXN1qihV1m6EoM1MIBuMBtvSiy6Fn4=w2400",
    category: "interior",
    title: "Staircase Renovation"
  },
  {
    id: 9,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPyeR5EDzGxnoZkcabW8XDXZpaJGodMZhzEkd62n-Hbvsm3UJ_YpzCdmXcOKjGrFfXAzOMPYmbohdv_n4Q14NnPo42CDgl7vkCq7eZG-syP_2VOXeY=w2400",
    category: "commercial",
    title: "Office Transformation"
  },
  {
    id: 10,
    src: "https://lh3.googleusercontent.com/pw/AP1GczN2LnF28pp6_QA_UiYYMkW8C8BSJ1gMu-9gAA0gpc1_EDCiPmh7vJLW3Qo8FRKGE1nSoyJBCBmiz-ARJ4AKVDOn9tO-s3sFWh6vrbGIr2z_zNwPDNM=w2400",
    category: "exterior",
    title: "Beautiful Home Exterior"
  },
  {
    id: 11,
    src: "https://lh3.googleusercontent.com/pw/AP1GczPuAoGi6gm1AM3ZLAEh8XCdgkiOMkVyDVirOlf2yZk6DsvcLJbNE9C-HZ1E-mbJY4bikMaPSkU9w79mPMUhfXuhhtx_sh74Fz--AiJ5xkVGv10b50U=w2400",
    category: "interior",
    title: "Bathroom Renovation"
  },
  {
    id: 12,
    src: "https://lh3.googleusercontent.com/pw/AP1GczNm_X84bUL31U9hGPfLbmgZ7O_3pZwyFjVGJiDgUqDdQBRwGi7-rUaMDavkoFYi_xswHxiHkBDuibOj_zB92RMqZsivKRV2U0nNx4Gmb3tPRJBzPAg=w2400",
    category: "exterior",
    title: "Finished Exterior Project"
  }
];

export const galleryCategories = [
  { id: 'all', name: 'All Projects' },
  { id: 'interior', name: 'Interior' },
  { id: 'exterior', name: 'Exterior' },
  { id: 'commercial', name: 'Commercial' }
];
