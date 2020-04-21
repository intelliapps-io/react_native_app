import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Account = {
  id: Scalars['ID'];
  accountType: AccountType;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  authCount?: Maybe<Scalars['Float']>;
};

export enum AccountType {
  Admin = 'admin',
  Parent = 'parent',
  Student = 'student'
}

export type Admin = {
  id: Scalars['ID'];
  accountType: AccountType;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  authCount?: Maybe<Scalars['Float']>;
  nickname?: Maybe<Scalars['String']>;
};

export type CreateAccountInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};


export type Group = {
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  minMenteeGradeLevel: Scalars['Int'];
  minMentorGradeLevel: Scalars['Int'];
  mentors?: Maybe<Array<Student>>;
  mentees: Array<Student>;
  meetings: Array<Meeting>;
};

export type GroupInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  minMenteeGradeLevel: Scalars['Int'];
  minMentorGradeLevel: Scalars['Int'];
};

export type Material = {
  id: Scalars['ID'];
  title: Scalars['String'];
  author?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  url: Scalars['String'];
  dueDate: Scalars['DateTime'];
  notes: Scalars['String'];
};

export type Meeting = {
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  /** minutes since midnight */
  startMin: Scalars['Int'];
  /** minutes since midnight */
  endMin: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  capacity: Scalars['Int'];
  group: Group;
  attendingMentors?: Maybe<Array<Student>>;
  attendingMentees: Array<Student>;
  materials: Array<Material>;
};

export type Mutation = {
  createStudentAccount: Account;
  createParentAccount: Account;
  login?: Maybe<Account>;
  logout?: Maybe<Scalars['String']>;
  addParent: Student;
  removeParent: Student;
  addStudent: Parent;
  removeStudent: Parent;
  createGroup: Group;
  deleteGroup: Scalars['String'];
  editGroup: Group;
  joinGroupMentee: Group;
  leaveGroupMentee: Group;
  joinGroupMentor: Group;
  leaveGroupMentor: Group;
};


export type MutationCreateStudentAccountArgs = {
  input: StudentInput;
};


export type MutationCreateParentAccountArgs = {
  input: ParentInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddParentArgs = {
  parentEmail: Scalars['String'];
};


export type MutationRemoveParentArgs = {
  parentEmail: Scalars['String'];
};


export type MutationAddStudentArgs = {
  studentEmail: Scalars['String'];
};


export type MutationRemoveStudentArgs = {
  studentEmail: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  input: GroupInput;
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationEditGroupArgs = {
  input: GroupInput;
  id: Scalars['String'];
};


export type MutationJoinGroupMenteeArgs = {
  id: Scalars['String'];
};


export type MutationLeaveGroupMenteeArgs = {
  id: Scalars['String'];
};


export type MutationJoinGroupMentorArgs = {
  id: Scalars['String'];
};


export type MutationLeaveGroupMentorArgs = {
  id: Scalars['String'];
};

export type Parent = {
  id: Scalars['ID'];
  accountType: AccountType;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  authCount?: Maybe<Scalars['Float']>;
  children: Array<Student>;
};

export type ParentInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  studentsEmail?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
  me: Account;
  student: Student;
  parent: Parent;
};


export type QueryStudentArgs = {
  input: QueryStudentInput;
};


export type QueryParentArgs = {
  input: QueryParentInput;
};

export type QueryParentInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type QueryStudentInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type Student = {
  id: Scalars['ID'];
  accountType: AccountType;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  authCount?: Maybe<Scalars['Float']>;
  parents?: Maybe<Array<Parent>>;
  mentorGroups: Array<Group>;
  menteeGroups: Array<Group>;
  gradeLevel: Scalars['Int'];
};

export type StudentInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  parentsEmail?: Maybe<Array<Scalars['String']>>;
  gradeLevel: Scalars['Int'];
};

export type CreateStudentAccountMutationVariables = {
  input: StudentInput;
};


export type CreateStudentAccountMutation = { createStudentAccount: AccountFragment };

export type CreateParentAccountMutationVariables = {
  input: ParentInput;
};


export type CreateParentAccountMutation = { createParentAccount: AccountFragment };

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = { login?: Maybe<AccountFragment> };

export type LogoutMutationVariables = {};


export type LogoutMutation = Pick<Mutation, 'logout'>;

export type MeQueryVariables = {};


export type MeQuery = { me: AccountFragment };

export type AccountFragment = Pick<Account, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone' | 'authCount'>;

export type ParentFragment = (
  Pick<Parent, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone'>
  & { children: Array<Pick<Student, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone'>> }
);

export type ParentQueryVariables = {
  input: QueryParentInput;
};


export type ParentQuery = { parent: ParentFragment };

export type StudentFragment = (
  Pick<Student, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone' | 'gradeLevel'>
  & { parents?: Maybe<Array<Pick<Parent, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone'>>> }
);

export type AddParentMutationVariables = {
  parentEmail: Scalars['String'];
};


export type AddParentMutation = { addParent: StudentFragment };

export type RemoveParentMutationVariables = {
  parentEmail: Scalars['String'];
};


export type RemoveParentMutation = { removeParent: StudentFragment };

export type StudentQueryVariables = {
  input: QueryStudentInput;
};


export type StudentQuery = { student: StudentFragment };

export const AccountFragmentDoc = gql`
    fragment Account on Account {
  id
  accountType
  firstName
  lastName
  name
  email
  phone
  authCount
}
    `;
export const ParentFragmentDoc = gql`
    fragment Parent on Parent {
  id
  accountType
  firstName
  lastName
  name
  email
  phone
  children {
    id
    accountType
    firstName
    lastName
    name
    email
    phone
  }
}
    `;
export const StudentFragmentDoc = gql`
    fragment Student on Student {
  id
  accountType
  firstName
  lastName
  name
  email
  phone
  gradeLevel
  parents {
    id
    accountType
    firstName
    lastName
    name
    email
    phone
  }
}
    `;
export const CreateStudentAccountDocument = gql`
    mutation CreateStudentAccount($input: StudentInput!) {
  createStudentAccount(input: $input) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type CreateStudentAccountMutationFn = ApolloReactCommon.MutationFunction<CreateStudentAccountMutation, CreateStudentAccountMutationVariables>;
export type CreateStudentAccountComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateStudentAccountMutation, CreateStudentAccountMutationVariables>, 'mutation'>;

    export const CreateStudentAccountComponent = (props: CreateStudentAccountComponentProps) => (
      <ApolloReactComponents.Mutation<CreateStudentAccountMutation, CreateStudentAccountMutationVariables> mutation={CreateStudentAccountDocument} {...props} />
    );
    
export type CreateStudentAccountProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateStudentAccountMutation, CreateStudentAccountMutationVariables>
    } & TChildProps;
export function withCreateStudentAccount<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateStudentAccountMutation,
  CreateStudentAccountMutationVariables,
  CreateStudentAccountProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateStudentAccountMutation, CreateStudentAccountMutationVariables, CreateStudentAccountProps<TChildProps, TDataName>>(CreateStudentAccountDocument, {
      alias: 'createStudentAccount',
      ...operationOptions
    });
};

/**
 * __useCreateStudentAccountMutation__
 *
 * To run a mutation, you first call `useCreateStudentAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentAccountMutation, { data, loading, error }] = useCreateStudentAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStudentAccountMutation, CreateStudentAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStudentAccountMutation, CreateStudentAccountMutationVariables>(CreateStudentAccountDocument, baseOptions);
      }
export type CreateStudentAccountMutationHookResult = ReturnType<typeof useCreateStudentAccountMutation>;
export type CreateStudentAccountMutationResult = ApolloReactCommon.MutationResult<CreateStudentAccountMutation>;
export type CreateStudentAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStudentAccountMutation, CreateStudentAccountMutationVariables>;
export const CreateParentAccountDocument = gql`
    mutation CreateParentAccount($input: ParentInput!) {
  createParentAccount(input: $input) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type CreateParentAccountMutationFn = ApolloReactCommon.MutationFunction<CreateParentAccountMutation, CreateParentAccountMutationVariables>;
export type CreateParentAccountComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateParentAccountMutation, CreateParentAccountMutationVariables>, 'mutation'>;

    export const CreateParentAccountComponent = (props: CreateParentAccountComponentProps) => (
      <ApolloReactComponents.Mutation<CreateParentAccountMutation, CreateParentAccountMutationVariables> mutation={CreateParentAccountDocument} {...props} />
    );
    
export type CreateParentAccountProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateParentAccountMutation, CreateParentAccountMutationVariables>
    } & TChildProps;
export function withCreateParentAccount<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateParentAccountMutation,
  CreateParentAccountMutationVariables,
  CreateParentAccountProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateParentAccountMutation, CreateParentAccountMutationVariables, CreateParentAccountProps<TChildProps, TDataName>>(CreateParentAccountDocument, {
      alias: 'createParentAccount',
      ...operationOptions
    });
};

/**
 * __useCreateParentAccountMutation__
 *
 * To run a mutation, you first call `useCreateParentAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParentAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParentAccountMutation, { data, loading, error }] = useCreateParentAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateParentAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateParentAccountMutation, CreateParentAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateParentAccountMutation, CreateParentAccountMutationVariables>(CreateParentAccountDocument, baseOptions);
      }
export type CreateParentAccountMutationHookResult = ReturnType<typeof useCreateParentAccountMutation>;
export type CreateParentAccountMutationResult = ApolloReactCommon.MutationResult<CreateParentAccountMutation>;
export type CreateParentAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateParentAccountMutation, CreateParentAccountMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
    );
    
export type LogoutProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>
    } & TChildProps;
export function withLogout<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LogoutMutation, LogoutMutationVariables, LogoutProps<TChildProps, TDataName>>(LogoutDocument, {
      alias: 'logout',
      ...operationOptions
    });
};

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Account
  }
}
    ${AccountFragmentDoc}`;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeQuery, MeQueryVariables>
    } & TChildProps;
export function withMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps, TDataName>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const ParentDocument = gql`
    query Parent($input: QueryParentInput!) {
  parent(input: $input) {
    ...Parent
  }
}
    ${ParentFragmentDoc}`;
export type ParentComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ParentQuery, ParentQueryVariables>, 'query'> & ({ variables: ParentQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ParentComponent = (props: ParentComponentProps) => (
      <ApolloReactComponents.Query<ParentQuery, ParentQueryVariables> query={ParentDocument} {...props} />
    );
    
export type ParentProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ParentQuery, ParentQueryVariables>
    } & TChildProps;
export function withParent<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ParentQuery,
  ParentQueryVariables,
  ParentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ParentQuery, ParentQueryVariables, ParentProps<TChildProps, TDataName>>(ParentDocument, {
      alias: 'parent',
      ...operationOptions
    });
};

/**
 * __useParentQuery__
 *
 * To run a query within a React component, call `useParentQuery` and pass it any options that fit your needs.
 * When your component renders, `useParentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useParentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ParentQuery, ParentQueryVariables>) {
        return ApolloReactHooks.useQuery<ParentQuery, ParentQueryVariables>(ParentDocument, baseOptions);
      }
export function useParentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ParentQuery, ParentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ParentQuery, ParentQueryVariables>(ParentDocument, baseOptions);
        }
export type ParentQueryHookResult = ReturnType<typeof useParentQuery>;
export type ParentLazyQueryHookResult = ReturnType<typeof useParentLazyQuery>;
export type ParentQueryResult = ApolloReactCommon.QueryResult<ParentQuery, ParentQueryVariables>;
export const AddParentDocument = gql`
    mutation AddParent($parentEmail: String!) {
  addParent(parentEmail: $parentEmail) {
    ...Student
  }
}
    ${StudentFragmentDoc}`;
export type AddParentMutationFn = ApolloReactCommon.MutationFunction<AddParentMutation, AddParentMutationVariables>;
export type AddParentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddParentMutation, AddParentMutationVariables>, 'mutation'>;

    export const AddParentComponent = (props: AddParentComponentProps) => (
      <ApolloReactComponents.Mutation<AddParentMutation, AddParentMutationVariables> mutation={AddParentDocument} {...props} />
    );
    
export type AddParentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddParentMutation, AddParentMutationVariables>
    } & TChildProps;
export function withAddParent<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddParentMutation,
  AddParentMutationVariables,
  AddParentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddParentMutation, AddParentMutationVariables, AddParentProps<TChildProps, TDataName>>(AddParentDocument, {
      alias: 'addParent',
      ...operationOptions
    });
};

/**
 * __useAddParentMutation__
 *
 * To run a mutation, you first call `useAddParentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddParentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addParentMutation, { data, loading, error }] = useAddParentMutation({
 *   variables: {
 *      parentEmail: // value for 'parentEmail'
 *   },
 * });
 */
export function useAddParentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddParentMutation, AddParentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddParentMutation, AddParentMutationVariables>(AddParentDocument, baseOptions);
      }
export type AddParentMutationHookResult = ReturnType<typeof useAddParentMutation>;
export type AddParentMutationResult = ApolloReactCommon.MutationResult<AddParentMutation>;
export type AddParentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddParentMutation, AddParentMutationVariables>;
export const RemoveParentDocument = gql`
    mutation RemoveParent($parentEmail: String!) {
  removeParent(parentEmail: $parentEmail) {
    ...Student
  }
}
    ${StudentFragmentDoc}`;
export type RemoveParentMutationFn = ApolloReactCommon.MutationFunction<RemoveParentMutation, RemoveParentMutationVariables>;
export type RemoveParentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RemoveParentMutation, RemoveParentMutationVariables>, 'mutation'>;

    export const RemoveParentComponent = (props: RemoveParentComponentProps) => (
      <ApolloReactComponents.Mutation<RemoveParentMutation, RemoveParentMutationVariables> mutation={RemoveParentDocument} {...props} />
    );
    
export type RemoveParentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<RemoveParentMutation, RemoveParentMutationVariables>
    } & TChildProps;
export function withRemoveParent<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RemoveParentMutation,
  RemoveParentMutationVariables,
  RemoveParentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RemoveParentMutation, RemoveParentMutationVariables, RemoveParentProps<TChildProps, TDataName>>(RemoveParentDocument, {
      alias: 'removeParent',
      ...operationOptions
    });
};

/**
 * __useRemoveParentMutation__
 *
 * To run a mutation, you first call `useRemoveParentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeParentMutation, { data, loading, error }] = useRemoveParentMutation({
 *   variables: {
 *      parentEmail: // value for 'parentEmail'
 *   },
 * });
 */
export function useRemoveParentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveParentMutation, RemoveParentMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveParentMutation, RemoveParentMutationVariables>(RemoveParentDocument, baseOptions);
      }
export type RemoveParentMutationHookResult = ReturnType<typeof useRemoveParentMutation>;
export type RemoveParentMutationResult = ApolloReactCommon.MutationResult<RemoveParentMutation>;
export type RemoveParentMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveParentMutation, RemoveParentMutationVariables>;
export const StudentDocument = gql`
    query Student($input: QueryStudentInput!) {
  student(input: $input) {
    ...Student
  }
}
    ${StudentFragmentDoc}`;
export type StudentComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<StudentQuery, StudentQueryVariables>, 'query'> & ({ variables: StudentQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const StudentComponent = (props: StudentComponentProps) => (
      <ApolloReactComponents.Query<StudentQuery, StudentQueryVariables> query={StudentDocument} {...props} />
    );
    
export type StudentProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<StudentQuery, StudentQueryVariables>
    } & TChildProps;
export function withStudent<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  StudentQuery,
  StudentQueryVariables,
  StudentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, StudentQuery, StudentQueryVariables, StudentProps<TChildProps, TDataName>>(StudentDocument, {
      alias: 'student',
      ...operationOptions
    });
};

/**
 * __useStudentQuery__
 *
 * To run a query within a React component, call `useStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStudentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StudentQuery, StudentQueryVariables>) {
        return ApolloReactHooks.useQuery<StudentQuery, StudentQueryVariables>(StudentDocument, baseOptions);
      }
export function useStudentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StudentQuery, StudentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StudentQuery, StudentQueryVariables>(StudentDocument, baseOptions);
        }
export type StudentQueryHookResult = ReturnType<typeof useStudentQuery>;
export type StudentLazyQueryHookResult = ReturnType<typeof useStudentLazyQuery>;
export type StudentQueryResult = ApolloReactCommon.QueryResult<StudentQuery, StudentQueryVariables>;