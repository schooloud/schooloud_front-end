import styled from "styled-components";

function createData(name, os, ip, instance, keypair, status) {
  return { name, os, ip, instance, keypair, status };
}

export default function Table({
  cols = ["Name", "OS", "IP Adress", "Instance Type", "KeyPair", "Status"],
  rows = [
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
  ],
  checkBox = true,
  onClick,
  selectedCol,
  setSelectedCol,
}) {
  const allSelectedCol = [];
  rows.map((row) => allSelectedCol.push(row.name));

  const selectedHandler = (id) => {
    if (selectedCol.includes(id)) {
      setSelectedCol(selectedCol.filter((element) => element !== id));
    } else {
      setSelectedCol((state) => [...state, id]);
    }
  };

  const headSelectedHandler = () => {
    if (selectedCol.length === rows.length) {
      setSelectedCol([]);
    } else {
      setSelectedCol([...allSelectedCol]);
    }
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            {checkBox && (
              <th className="checkboxth" align="center">
                <CheckBoxWrapper onClick={headSelectedHandler}>
                  <input
                    type="checkbox"
                    checked={selectedCol.length === rows.length}
                    readOnly
                  />
                </CheckBoxWrapper>
              </th>
            )}
            {cols.map((col) => (
              <th key={col} align="center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              value={row.name}
              onClick={onClick}
              className={
                selectedCol.includes(row.name) ? "selected" : "notSelected"
              }
            >
              {checkBox && (
                <td align="center">
                  <CheckBoxWrapper
                    onClick={(event) => {
                      selectedHandler(row.name);
                      event.stopPropagation();
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCol.includes(row.name)}
                      readOnly
                    />
                  </CheckBoxWrapper>
                </td>
              )}
              <td align="center">{row.name}</td>
              <td align="center">{row.os}</td>
              <td align="center">{row.ip}</td>
              <td align="center">{row.instance}</td>
              <td align="center">{row.keypair}</td>
              <td align="center">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  width: 100%;

  table {
    width: 100%;
    border-radius: 0.5rem;
    border-top: 1px solid #e0e0e0;
    border-collapse: collapse;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    overflow: hidden;
  }

  th {
    font-weight: 600;
    padding: 0 0.4rem;
    &.checkboxth {
      padding: 0 0;
    }
  }

  tr {
    height: 3rem;
    border-top: 1px solid #e0e0e0;
  }

  tbody {
    tr {
      &:hover {
        background-color: var(--light);
      }
      &.selected {
        background-color: var(--light);
        &:hover {
          background-color: var(--extra-light);
        }
      }
    }
  }
`;

const CheckBoxWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;

  &:hover {
    background-color: var(--semi-light);
    cursor: pointer;
  }
  input[type="checkbox"] {
    transform: scale(1.3);
    accent-color: var(--dark);
    &:hover {
      cursor: pointer;
    }
  }
`;