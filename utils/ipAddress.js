import fetch from "node-fetch";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  minTime: 200, // 5 requests per second
});

export function getIp(req) {
  return (
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    ""
  );
}

export async function getLocation(allIp) {
  const locations = Promise.all(
    allIp.map((ip) =>
      limiter.schedule(() =>
        fetch(`https://ipapi.co/${ip}/json`)
          .then((response) => response.json())
          .then(({ city, country_name, country_code_iso3 }) => [
            city,
            country_name,
            country_code_iso3,
          ])
      )
    )
  );

  return locations;
}
