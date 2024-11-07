## Dùng nestjs (node 16 version), prisma, docker
### Tải node và docker desktop nếu chưa làm
Tải node version 16
Tải docker desktop
npm install -g @nestjs/cli
### Clone dự án về
git clone <URL của repo>
cd cnpm-be
### Cài đặt các package
npm install
### Khởi tạo Prisma
npx prisma generate
### Migration cơ sở dữ liệu (thay đổi database)
npx prisma migrate dev --name init
### Khởi động docker (đảm bảo tải docker desktop và bật)
docker-compose up -d
### Xem và tương tác với databse 
npx prisma studio
### Chạy dự án
npm run start:dev
### Chú ý: Không thay đổi nội dung file .env
