import { styled, keyframes } from "styled-components"



export const SubTitle = styled.h4`
    font-weight: 700;
    transition: all 0.5s ease-in-out;
    font-size: 1.5rem;
    -webkit-text-stroke: 1.4px black;
    color: white;
    text-shadow: 2px 2px black;
`

const hammerDown = keyframes`
  to {
    transform: translatey(15px);
  }
`

export const LoadingSubTitle = styled(SubTitle)`
animation: ${hammerDown} .5s ease-out infinite alternate;
animation-delay: .3s;
font-size: 2.4rem;
`