import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  return (
    <SlicemasterGrid className="center">
      <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
      <div>
        <h2 className="mark">{slicemaster.name}</h2>
        <p>{slicemaster.description}</p>
      </div>
    </SlicemasterGrid>
  );
}

// this needs to be dynamic based on slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
