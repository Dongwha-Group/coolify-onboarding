server {
    listen 80;

    # Next.js standalone 서버로 프록시
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # /api/* 요청을 백엔드 컨테이너로 리버스 프록시
    location /api/ {
        proxy_pass http://backend:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Next.js 정적 파일
    location /_next/static/ {
        alias /app/.next/static/;
        expires 1y;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
