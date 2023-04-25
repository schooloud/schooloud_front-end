import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, os, ip, instance, keypair, status) {
  return { name, os, ip, instance, keypair, status };
}

const rows = [
  createData(
    "jsb-instance",
    "Ubuntu Server 20.04 LTS",
    "192.168.0.8",
    "u2.c1m1 (1vCPU, 1GB)",
    "jsb-keypair",
    "ON"
  ),
  createData(
    "ksh-instance",
    "Ubuntu Server 20.04 LTS",
    "192.168.0.21",
    "u2.c1m1 (1vCPU, 1GB)",
    "ksh-keypair",
    "ON"
  ),
  createData(
    "lyr-instance",
    "Ubuntu Server 20.04 LTS",
    "192.168.0.34",
    "u2.c1m1 (1vCPU, 1GB)",
    "lyr-instance",
    "ON"
  ),
  createData(
    "yjh-instance",
    "Ubuntu Server 20.04 LTS",
    "192.168.0.68",
    "u2.c1m1 (1vCPU, 1GB)",
    "yjh-keypair",
    "ON"
  ),
  createData(
    "lsi-instance",
    "Ubuntu Server 20.04 LTS",
    "192.168.0.108",
    "u2.c1m1 (1vCPU, 1GB)",
    "lsi-keypair",
    "ON"
  ),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">OS</TableCell>
            <TableCell align="center">IP Adress</TableCell>
            <TableCell align="center">Instance Type</TableCell>
            <TableCell align="center">KeyPair</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                console.log("hi");
              }}
            >
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.os}</TableCell>
              <TableCell align="center">{row.ip}</TableCell>
              <TableCell align="center">{row.instance}</TableCell>
              <TableCell align="center">{row.keypair}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
