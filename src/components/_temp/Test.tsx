import { Button } from "react-bootstrap";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import axios from "axios";
import { googleAccess, login } from "@/api";
import { GoogleLoginModel } from "@/types";

function Test() {


  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) =>
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const user = res.data;
          const loginInfo: GoogleLoginModel = {
            id: user.id,
            email: user.email,

            name: user.name,
            picture: user.picture,
          };
          googleAccess(loginInfo)
            .then((data) => {
              console.log(data);
              login(data.data)
                .then((data) => {
                  localStorage.setItem("token", data.data.token);
                  if (data.data.refreshToken != null) {
                    localStorage.setItem(
                      "refreshToken",
                      data.data.refreshToken
                    );
                  }

                  window.setTimeout(() => window.location.reload(), 500);
                })
                .catch(() => {});
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err)),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {}, []);

  return (
    <div>
      <p>sono test!</p>
      {/* <GoogleLogin
        onSuccess={ (codeResponse) =>
          axios
            .get(
              `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.credential}`,
              {
                headers: {
                  Authorization: `Bearer ${codeResponse.credential}`,
                  Accept: "application/json",
                },
              }
            )
            .then((res) => {
              const user = res.data;
              const loginInfo: GoogleLoginModel = {
                id: user.id,
                email: user.email,
    
                name: user.name,
                picture: user.picture,
              };
              googleAccess(loginInfo)
                .then((data) => {
                  console.log(data);
                  login(data.data)
                    .then((data) => {
                      localStorage.setItem("token", data.data.token);
                      if (data.data.refreshToken != null) {
                        localStorage.setItem(
                          "refreshToken",
                          data.data.refreshToken
                        );
                      }
    
                      window.setTimeout(() => window.location.reload(), 500);
                    })
                    .catch(() => {});
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err))}
        onError={() => console.log("plofi")}
        
      /> */}
      <Button variant="danger" onClick={() => googleLogin()}>Login with Google</Button>
    </div>
  );
}

export default Test;
