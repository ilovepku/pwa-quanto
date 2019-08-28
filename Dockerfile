FROM node:10.16.2

WORKDIR /user/src/pwa-quanto

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]