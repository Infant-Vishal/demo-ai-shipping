import React from "react";
import { useState } from "react";
import BarChart from "../charts/BarChart";
import { CompanyProfit, OrderStatus, Users } from "../utils/Data";
import LineChart from "../charts/LineChart";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ReactDatePicker from "react-datepicker";
import ChartHOC from "../utils/ChartHOC";
import "../../styles/super-admin/Dashboard.css"

function Dashboard() {
 
  const [startDate, setStartDate] = useState(new Date());

  const [userData, setUserData] = useState({
    labels: Users?.map((data) => data.role),
    datasets: [
      {
        label: "Active users",
        data: Users?.map((data) => data.Count),
        backgroundColor: [
          "#1c5bb7",
          "#e2ae4e",
          "#ec4c3b",
          "#14a2d8de",
          "#b2b8f6",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [statusData, setStatusData] = useState({
    labels: OrderStatus.map((data) => data.Status),
    datasets: [
      {
        label: "Orders status",
        data: OrderStatus.map((data) => data.Count),
        backgroundColor: [
          "#2e7d33",
          "#f5a142",
          "#1976b2",
          "#d32f30",
          "#443838",
        ],
        borderWidth: 1,
      },
    ],
  });

  return (
    <>
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <div className="mainchartsdiv">
        <div style={{ width: 600, margin: "6px 20px" }}>
          <BarChart chartData={statusData} />
        </div>
        <div>
          <List
            sx={{ minWidth: 400, maxHeight: 340 }}
            className="notificationList"
            style={{ backgroundColor: "#eaecff" }}
          >
            <h4 style={{ paddingLeft: "15px", color: "#41880b" }}>
              Order Notifications - 09 June 2022
            </h4>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CampaignIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="ORD0023"
                secondary="(ORD0023) order was dispatched"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DeliveryDiningIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="ORD9864"
                secondary="(ORD9864) order was delivered"
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIndIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="ORD0321"
                secondary="(ORD0321) order was assigned to shipper"
              />
            </ListItem>
          </List>
        </div>
      </div>

      <div className="mainchartsdiv">
        <div style={{ width: 600, height: 320, margin: "6px 20px" }}>
          <LineChart chartData={userData} />
        </div>
        <List
          sx={{ minWidth: 400, maxHeight: 340 }}
          className="notificationList"
          style={{ backgroundColor: "#e8f1fe" }}
        >
          <h4 style={{ paddingLeft: "15px", color: "#1919a2" }}>
            User Notifications - 09 June 2022
          </h4>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="ADM00123"
              secondary="(ADM00123) admin was added"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DirectionsBusIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="TRS00432"
              secondary="(TRS00432) transporter was added "
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AdminPanelSettingsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="SUP0321"
              secondary="(SUP0321) super admin was added"
            />
          </ListItem>
        </List>
      </div>
    </>
  );
}

export default ChartHOC(Dashboard, "activeCards");
