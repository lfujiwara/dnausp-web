import { Center } from "@chakra-ui/react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState<undefined>(undefined);

  return (
    <Center>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID + ""}
        buttonText="Login"
        onSuccess={(x) => setData(x)}
        onFailure={(x) => console.error(x)}
        cookiePolicy={"single_host_origin"}
        responseType={"code"}
      />
      <GoogleLogout clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID + ""} />
    </Center>
  );
}
