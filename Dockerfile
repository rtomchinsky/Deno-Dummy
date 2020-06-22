FROM hayd/debian-deno as builder

WORKDIR /usr/src/app
COPY src/ ./src/
RUN mkdir out/ && deno bundle src/app.ts out/bundle.js

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

FROM hayd/debian-deno

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/out/bundle.js bundle.js
COPY --from=builder /tini /tini

ENTRYPOINT [ "/tini", "--", "deno" ]
CMD [ "run", "--allow-net", "bundle.js" ]