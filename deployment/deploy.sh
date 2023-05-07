#1. apt update
sudo apt update

#2. nodejs 다운로드
sudo apt install -y nodejs

#3. npm 다운로드
sudo apt install -y npm

#nodejs를 관리하고 업그레이드하는 도구인 'n'을 전역적으로 설치
sudo npm install -g n

#4. nodejs 버전 업그레이드
sudo n lts

#nginx 설치
sudo apt install -y nginx

#nginx 설정
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo cp -f /schooloud_front-end/deployment/myapp.conf /etc/nginx/sites-available/myapp.conf
sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/myapp.conf
sudo systemctl restart nginx