import styled from "styled-components";

/*
  아래는 Table 사용 예시입니다.

  <Table
  data={dummy}\[]
  header={[
    "Name",
    "OS",
    "IP Adress",
    "Instance Type",
    "KeyPair",
    "Status",
  ]}
  selectedRow={selecetedRow}
  setSelectedRow={setSelectedRow}
  onClick={handleRowClick}
  />

  Table 컴포넌트를 사용하는 상위 컴포넌트에서 selectRow(선택된 Row 배열 스테이트)와 Setter을 내려주어야합니다.

  checkBox는 default 값이 true이며, 제일 왼쪽 열에 체크박스를 표시합니다. false일 시 표시 안함.

  header은 표의 제일 상단 줄에 들어갈 Field 명입니다. (변수 명과 달라도 상관 없음)

  data에는 id 값이 필수적으로 들어가야하며, id 값을 제외하고 모두 표에 나타납니다.

  multiSelect는 다중 선택이 가능한 표인가? 입니다. default 값은 true입니다.

  onClick은 각 Row를 클릭하면 실행할 함수입니다. 클릭 시 각 row의 id값을 props에 넣어서 함수를 실행시킵니다.
  아래는 onClick함수 예시입니다.

    const handleRowClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
    };

*/

const dummy = [
  {
    id: "1",
    name: "jsb-instance",
    os: "Ubuntu Server 20.04 LTS",
    ip: "192.168.0.8",
    type: "u2.c1m1 (1vCPU, 1GB)",
    keypair: "jsb-keypair",
    status: "ON",
  },
  {
    id: "2",
    name: "yjh-instance",
    os: "Ubuntu Server 20.04 LTS",
    ip: "192.168.0.8",
    type: "u2.c1m1 (1vCPU, 1GB)",
    keypair: "yjh-keypair",
    status: "ON",
  },
  {
    id: "3",
    name: "ksh-instance",
    os: "Ubuntu Server 20.04 LTS",
    ip: "192.168.0.8",
    type: "u2.c1m1 (1vCPU, 1GB)",
    keypair: "ksh-keypair",
    status: "ON",
  },
  {
    id: "4",
    name: "lyr-instance",
    os: "Ubuntu Server 20.04 LTS",
    ip: "192.168.0.8",
    type: "u2.c1m1 (1vCPU, 1GB)",
    keypair: "lyr-keypair",
    status: "ON",
  },
  {
    id: "5",
    name: "lsi-instance",
    os: "Ubuntu Server 20.04 LTS",
    ip: "192.168.0.8",
    type: "u2.c1m1 (1vCPU, 1GB)",
    keypair: "lsi-keypair",
    status: "ON",
  },
];

export default function Table({
  header = ["Name", "OS", "IP Adress", "Instance Type", "KeyPair", "Status"],
  data = dummy,
  checkBox = true,
  onClick,
  selectedRow,
  setSelectedRow,
  multiSelect = true,
}) {
  const allSelectedRow = [];

  data?.map((row) => allSelectedRow.push(row.id));

  const selectedHandler = (id) => {
    if (multiSelect) {
      if (selectedRow?.includes(id)) {
        setSelectedRow(selectedRow?.filter((element) => element !== id));
      } else {
        setSelectedRow((state) => [...state, id]);
      }
    } else {
      if (selectedRow?.includes(id)) {
        setSelectedRow([]);
      } else {
        setSelectedRow([id]);
      }
    }
  };

  const headSelectedHandler = () => {
    if (selectedRow?.length === data?.length) {
      setSelectedRow([]);
    } else {
      setSelectedRow([...allSelectedRow]);
    }
  };

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            {checkBox ? (
              multiSelect ? (
                <th className="checkboxth" align="center">
                  <CheckBoxWrapper onClick={headSelectedHandler}>
                    <input
                      type="checkbox"
                      checked={selectedRow?.length === data?.length}
                      readOnly
                    />
                  </CheckBoxWrapper>
                </th>
              ) : (
                <th align="center">
                  <CheckBoxHeaderNone />
                </th>
              )
            ) : null}
            {header.map((field) => (
              <th key={field} align="center">
                {field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              value={row.id}
              onClick={() => {
                onClick(row.id);
              }}
              className={
                selectedRow?.includes(row.id) ? "selected" : "notSelected"
              }
            >
              {checkBox && (
                <td align="center">
                  <CheckBoxWrapper
                    onClick={(event) => {
                      selectedHandler(row.id);
                      event.stopPropagation();
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRow?.includes(row.id)}
                      readOnly
                    />
                  </CheckBoxWrapper>
                </td>
              )}
              {Object.keys(row).map(
                (field) =>
                  field === "id" || (
                    <td key={row[field]} align="center">
                      {row[field]}
                    </td>
                  )
              )}
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
      cursor: pointer;
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

const CheckBoxHeaderNone = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`;

// function createData(name, os, ip, instance, keypair, status) {
//   return { name, os, ip, instance, keypair, status };
// }
// const rows = [
//   createData(
//     "jsb-instance",
//     "Ubuntu Server 20.04 LTS",
//     "192.168.0.8",
//     "u2.c1m1 (1vCPU, 1GB)",
//     "jsb-keypair",
//     "ON"
//   ),
//   createData(
//     "ksh-instance",
//     "Ubuntu Server 20.04 LTS",
//     "192.168.0.21",
//     "u2.c1m1 (1vCPU, 1GB)",
//     "ksh-keypair",
//     "ON"
//   ),
//   createData(
//     "lyr-instance",
//     "Ubuntu Server 20.04 LTS",
//     "192.168.0.34",
//     "u2.c1m1 (1vCPU, 1GB)",
//     "lyr-instance",
//     "ON"
//   ),
//   createData(
//     "yjh-instance",
//     "Ubuntu Server 20.04 LTS",
//     "192.168.0.68",
//     "u2.c1m1 (1vCPU, 1GB)",
//     "yjh-keypair",
//     "ON"
//   ),
//   createData(
//     "lsi-instance",
//     "Ubuntu Server 20.04 LTS",
//     "192.168.0.108",
//     "u2.c1m1 (1vCPU, 1GB)",
//     "lsi-keypair",
//     "ON"
//   ),
// ];
