import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const TestComponent = () => {
  interface TestData {
    data: string;
  }

  const TEST_QUERY = gql`
    query Test {
      test
    }
  `;

  const TEST_OBJ_QUERY = gql`
    query getTestObj {
      testObj{
        data
      }
    }
  `;

  const { loading: dataLoading, data: testData } = useQuery<TestData>(TEST_QUERY);
  const { loading: objDataLoading, data: objTestData } = useQuery<TestData>(TEST_OBJ_QUERY);

  console.log('loading: ', dataLoading, 'data?: ', testData)
  console.log('loading2: ', objDataLoading, 'data?2: ', objTestData)

  return <p>Its Ok This works too</p>;
};