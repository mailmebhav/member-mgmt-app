"use client";
import * as React from "react";
import {
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { useTheme } from "@mui/material";
const MainContent = () => {
  const mytheme = useTheme();
  return (
    <Container maxWidth="md">
      <Grid container spacing={10} pt={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 100,
              maxWidth: 350,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 100px",
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                pt: 2,
                color: "white",
                background: `${mytheme.palette.primary.main}`,
                border: "1px solid transparent",
                "&:hover": {
                  color: `${mytheme.palette.primary.main}`,
                  background: "white",
                  border: "0.3px solid ",
                  borderColor: `${mytheme.palette.primary.main}`,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  background: "white",
                  color: `${mytheme.palette.primary.main}`,
                }}
              >
                <CorporateFareIcon />
              </Avatar>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  align="center"
                >
                  Firm
                </Typography>
                <Typography variant="body2">
                  Allows to add/edit/view firms
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 100,
              maxWidth: 350,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 100px",
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                pt: 2,
                border: "1px solid transparent",
                color: "white",
                background: `${mytheme.palette.primary.main}`,
                "&:hover": {
                  color: `${mytheme.palette.primary.main}`,
                  background: "white",
                  border: "0.3px solid ",
                  borderColor: `${mytheme.palette.primary.main}`,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  background: "white",
                  color: `${mytheme.palette.primary.main}`,
                }}
              >
                <GroupIcon />
              </Avatar>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  align="center"
                >
                  Members
                </Typography>
                <Typography variant="body2">
                  Allows to add/edit/view members details
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 100,
              maxWidth: 350,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 100px",
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                pt: 2,
                border: "1px solid transparent",
                color: "white",
                background: `${mytheme.palette.primary.main}`,
                "&:hover": {
                  color: `${mytheme.palette.primary.main}`,
                  background: "white",
                  border: "0.3px solid ",
                  borderColor: `${mytheme.palette.primary.main}`,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  background: "white",
                  color: `${mytheme.palette.primary.main}`,
                }}
              >
                <CurrencyRupeeIcon />
              </Avatar>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  align="center"
                >
                  Payments
                </Typography>
                <Typography variant="body2">
                  Track of payments made by individuals
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              minWidth: 100,
              maxWidth: 350,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 100px",
            }}
          >
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                pt: 2,
                border: "1px solid transparent",
                color: "white",
                background: `${mytheme.palette.primary.main}`,
                "&:hover": {
                  color: `${mytheme.palette.primary.main}`,
                  background: "white",
                  border: "0.3px solid ",
                  borderColor: `${mytheme.palette.primary.main}`,
                },
              }}
            >
              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                  background: "white",
                  color: `${mytheme.palette.primary.main}`,
                }}
              >
                <AssessmentIcon />
              </Avatar>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="div"
                  align="center"
                >
                  Reports
                </Typography>
                <Typography variant="body2">
                  Cummlative stats of samaj members
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainContent;
