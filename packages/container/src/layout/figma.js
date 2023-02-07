import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Logo from "../assets/footer-logo.png"

const FooterSectionContainer = styled("footer")(() => ({
  fontFamily: "Arial",
  color: "white",
  backgroundColor: "#3A547C",
  padding: "42px 0 26px 68px",
  lineHeight: "24px",
  backgroundImage: `url(${Logo})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right bottom',
  "& a": {
    color: "white",
    textDecoration: "none",
  },
}));

const textData = `<div class="cmp-text"><p>This site is for <u><a href="/individual-investor/us/en/terms-and-conditions-of-use.html" target="_self" title="opens in same window/tab">persons in the United States only.</a></u><br>
Dodge &amp; Cox Funds are distributed by Foreside Fund Services, LLC, which is not affiliated with Dodge &amp; Cox.</p>
<p><b>Before investing in any Dodge &amp; Cox Fund, you should carefully consider the Fund's investment objectives, risks, and charges and expenses. This and other important information&nbsp;is&nbsp;contained in a Fund's <a href="/content/dam/dc/us/en/pdf/prospectuses/dc_statutory_prospectus.pdf" target="_blank" title="opens in new window/tab" rel="noopener">prospectus<span class="screen-reader-only">(opens in a new tab)</span></a> and <a href="/individual-investor/us/en/investing/our-funds/funds-at-a-glance.html#tabs-a253429a7a-item-70c7a4a33c-list" target="_self" title="opens in same window/tab">summary prospectus</a>. Please read the prospectus and summary prospectus carefully before investing.&nbsp;</b>Investments are not FDIC-insured, nor are they deposits of or guaranteed by any bank or any other entity. The information provided here is neither tax nor legal advice. Prospective investors should consult with a tax or legal advisor before making any investment decision. The views and strategies described may not be suitable for all investors.&nbsp; The information on this website does not constitute an offer to sell, or a solicitation of an offer to purchase, securities in any jurisdiction to any person to whom it is not lawful to make such an offer. Investing involves risk, including possible loss of principal. Foreign investing, especially in developing countries, has special risks such as currency and market volatility and political and social instability. Diversification and asset allocation do not ensure a profit or guarantee against loss.<br>
<b>Past performance is no guarantee of future results.</b><br>
&nbsp;&nbsp;&nbsp;&nbsp;</p>
<p>Use of this site signifies that you accept our&nbsp;<a href="/individual-investor/us/en/terms-and-conditions-of-use.html" target="_self" title="opens in same window/tab">Terms &amp; Conditions of Use.</a></p>
<p>© 2023 Dodge &amp; Cox<sup>®</sup>. All rights reserved.<br>
</p>
</div>`;

const Footer = () => {
  return (
    <FooterSectionContainer>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div dangerouslySetInnerHTML={{ __html: textData }}></div>
        </Grid>
      </Grid>
    </FooterSectionContainer>
  );
};

export default Footer;
