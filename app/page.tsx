import { LandingPage } from "@/components/site/LandingPage";
import { LocaleRedirect } from "@/components/site/LocaleRedirect";

export default function Home() {
  return (
    <>
      <LocaleRedirect />
      <LandingPage lang="en" />
    </>
  );
}
