## Setting API environment
1. Ganti nama file `.env.example` menjadi `.env`
2. Buat atau ganti value dari `API_KEY` dengan API key dari [Youtube Data API](https://developers.google.com/youtube/v3/getting-started) atau bisa liat tutorial [disini](https://blog.hubspot.com/website/how-to-get-youtube-api-key)
3. Untuk PLAYLIST_ID bisa dilihat di URL playlist youtube, contoh: `https://www.youtube.com/playlist?list=PL7lkTmqIlvrG1_2RRpLbsqBZ4jQufKudB` maka `PL7lkTmqIlvrG1_2RRpLbsqBZ4jQufKudB` adalah `PLAYLIST_ID`. Atau bisa pake playlis  t saya aja yang udah ada di `.env` nya.

## Cara Jalanin Program
1. Buka terminal
2. install package yang dibutuhkan dengan 
  ```console
  npm i
  ``` 
  atau
  ```console 
  npm install
  ```
3. Jalankan program dengan 
```console 
npm run start-dev
```