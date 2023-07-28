import { keyframes, styled } from 'styled-components'

const sineWave = keyframes`
to {
  transform: translatey(10px);
}
`

export const Title = styled.h1
`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  letter-spacing: -1.8px;
  text-shadow: 5px 5px 0px #242424;
  -webkit-text-stroke: 1.5px #242424;
  max-width: 370px;
  text-align: center;
  line-height: 110%;

  animation: ${sineWave} 1.2s infinite alternate linear;
`