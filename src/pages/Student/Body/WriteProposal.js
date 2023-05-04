import MainButton from "../../../components/MainButton";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

/*
name = [String] 
purpose = [String]
instanceNum = [Int]
cpu = [Int]
memory = [Int]
storage = [Int]
author = [String]
*/

export default function WriteProposal() {
  const [date, setDate] = useState(new Date());

  const [proposal, setProposal] = useState({
    name: "",
    purpose: "",
    cpu: null,
    memory: null,
    storage: null,
    author_email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProposal({
      ...proposal,
      [name]: value,
    });
  };

  const handleSubmmit = (e) => {
    e.preventDefault();
    //proposal 객체에 date 추가
    proposal.date = date.toLocaleDateString();
    // axios.post("/api/proposal", proposal).then((res) => {
    //   if (res.data.success) {
    //     alert("제출되었습니다.");
    //   } else {
    //     alert("제출에 실패했습니다.");
    //   }
    // });
    console.log(proposal);
  };

  return (
    <Wrapper>
      <WriteProposalWrapper>
        <LeftContainer>
          <Form>
            <Div>
              <Label>Project Name</Label>
              <InputProjectName
                onChange={handleChange}
                type="text"
                name="name"
                maxLength={30}
                required
              />
            </Div>
            <Div>
              <Label>Project Purpose</Label>
              <Label2>
                Make sure that your description is as detailed as possible
              </Label2>
              <InputContainer>
                <InputDescription
                  onChange={handleChange}
                  type="text"
                  name="purpose"
                  maxLength={300}
                  required
                />
              </InputContainer>
            </Div>
            <Div>
              <Label>Quata</Label>
            </Div>
            <Div>
              <Label>total CPU</Label>
            </Div>
            <Div>
              <Label>total RAM</Label>
            </Div>
            <Div>
              <Label>total STORAGE</Label>
            </Div>
          </Form>
        </LeftContainer>
        <RightContainer>
          <CalendarDiv>
            <Label>Period of use</Label>
            {/* Calendar that is written in English */}
            <Calendar
              onChange={setDate}
              value={date}
              locale={"en-US"}
              className="calendar"
            />
            {/* show clicked date */}
            <p>selected Date: {date.toLocaleDateString()}</p>
          </CalendarDiv>
          <MainButton
            color={"semi-dark"}
            fullWidth={true}
            marginTop={1}
            onClick={handleSubmmit}
          >
            제출
          </MainButton>
        </RightContainer>
      </WriteProposalWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const WriteProposalWrapper = styled.div`
  margin-top: 1.4rem;
  display: flex;
  justify-content: space-around;
  width: 95%;
  height: 90%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

const CalendarDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
  margin-bottom: 2rem;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 600;
`;

const Label2 = styled.div`
  margin-bottom: 0.5rem;
  text-align: left;
  width: 80%;
  font-size: 1rem;
  font-weight: 200;
  color: grey;
`;

const InputProjectName = styled.input`
  width: 90%;
  height: 2.5rem;
  border: 0.7px solid var(--dark);
  border-radius: 5px;
  padding: 0.5rem;
`;

const InputDescription = styled.textarea`
  width: 90%;
  height: 7rem;
  border: 0.7px solid var(--dark);
  border-radius: 5px;
  padding: 0.5rem;
  vertical-align: top;
  resize: none;
  overflow: auto;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
