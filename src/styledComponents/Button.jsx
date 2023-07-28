import { styled } from "styled-components"

export const Button = styled.button
`
  width: 200px;
  height: 70px;
  background-color: white;
  border: 3px solid #3C896D;
  box-shadow: 0 10px 0px #3C896D;
  border-radius: 15px;
  color: #3C896D;
  font-size: 1.5rem;

  font-weight: 500;

  &:hover{
    filter: brightness(98%);
  }

  &:active{
    transform: translateY(9px);
    box-shadow: none;
  }
`

export const PrefButton = styled(Button)`
    width: 140px;
    height: 50px;
    font-size: 1.2rem;
    border-radius: 10px;
    margin-top: 10px;
`