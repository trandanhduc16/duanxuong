import { Box, Stack, styled, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
type BannerProps = {
  page: string;
};

const Banner = ({ page }: BannerProps) => {
  return (
    <>
      <BannerImage>
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <img />
          <Typography fontSize={48}>{page}</Typography>
          <Stack direction={"row"}>
            <Typography fontWeight={500}>Home</Typography>
            <NavigateNextIcon />
            <Typography fontWeight={300}>{page}</Typography>
          </Stack>
        </Stack>
      </BannerImage>
    </>
  );
};

export default Banner;

const BannerImage = styled(Box)({
  backgroundImage: "url(./banner.png)",
  height: "316px",
});
