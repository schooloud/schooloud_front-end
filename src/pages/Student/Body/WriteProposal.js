import MainButton from "../../../components/MainButton";
import styled from "styled-components";
import { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

export default function WriteProposal() {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(null);
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Wrapper>
      <WriteProposalWrapper>
        <LeftContainer>
          <Form>
            <Div>
              <Label className="projectName">Project Name</Label>
              <InputProjectName
                type="text"
                name="projectName"
                onChange={handleChange}
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
                  type="text"
                  name="projectPurpose"
                  onChange={handleChange}
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
          <MainButton color={"semi-dark"} fullWidth={true} marginTop={1}>
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

const InputDescription = styled.input`
  width: 90%;
  height: 7rem;
  border: 0.7px solid var(--dark);
  border-radius: 5px;
  padding: 0.5rem;
  vertical-align: top;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;
