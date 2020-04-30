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
  meetings: Array<Meeting>;
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
  meetings: Array<Meeting>;
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
  date: Scalars['String'];
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

export type MeetingInput = {
  date: Scalars['DateTime'];
  /** minutes since midnight */
  startMin: Scalars['Int'];
  /** minutes since midnight */
  endMin: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
  location: Scalars['String'];
  capacity: Scalars['Int'];
  groupId: Scalars['String'];
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
  createMeeting: Meeting;
  updateMeeting: Meeting;
  deleteMeeting: Scalars['String'];
  joinMeeting: Meeting;
  leaveMeeting: Meeting;
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


export type MutationCreateMeetingArgs = {
  input: MeetingInput;
};


export type MutationUpdateMeetingArgs = {
  input: MeetingInput;
  id: Scalars['String'];
};


export type MutationDeleteMeetingArgs = {
  id: Scalars['String'];
};


export type MutationJoinMeetingArgs = {
  id: Scalars['String'];
};


export type MutationLeaveMeetingArgs = {
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
  meetings: Array<Meeting>;
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
  group: Group;
  groups: Array<Group>;
  meeting: Meeting;
  meetings: Array<Meeting>;
};


export type QueryStudentArgs = {
  input: QueryStudentInput;
};


export type QueryParentArgs = {
  input: QueryParentInput;
};


export type QueryGroupArgs = {
  id: Scalars['String'];
};


export type QueryMeetingArgs = {
  id: Scalars['String'];
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
  meetings: Array<Meeting>;
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

export type AccountFragment = (
  Pick<Account, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone' | 'authCount'>
  & { meetings: Array<MeetingFragment> }
);

export type GroupFragment = (
  Pick<Group, 'id' | 'name' | 'description' | 'minMenteeGradeLevel' | 'minMentorGradeLevel'>
  & { mentors?: Maybe<Array<Pick<Student, 'id' | 'accountType' | 'name' | 'email'>>>, mentees: Array<Pick<Student, 'id' | 'accountType' | 'name' | 'email'>>, meetings: Array<Pick<Meeting, 'id'>> }
);

export type CreateGroupMutationVariables = {
  input: GroupInput;
};


export type CreateGroupMutation = { createGroup: Pick<Group, 'id' | 'name' | 'description' | 'minMenteeGradeLevel' | 'minMentorGradeLevel'> };

export type EditGroupMutationVariables = {
  id: Scalars['String'];
  input: GroupInput;
};


export type EditGroupMutation = { editGroup: GroupFragment };

export type JoinGroupMenteeMutationVariables = {
  id: Scalars['String'];
};


export type JoinGroupMenteeMutation = { joinGroupMentee: GroupFragment };

export type JoinGroupMentorMutationVariables = {
  id: Scalars['String'];
};


export type JoinGroupMentorMutation = { joinGroupMentor: GroupFragment };

export type LeaveGroupMenteeMutationVariables = {
  id: Scalars['String'];
};


export type LeaveGroupMenteeMutation = { leaveGroupMentee: GroupFragment };

export type LeaveGroupMentorMutationVariables = {
  id: Scalars['String'];
};


export type LeaveGroupMentorMutation = { leaveGroupMentor: GroupFragment };

export type GroupQueryVariables = {
  id: Scalars['String'];
};


export type GroupQuery = { group: GroupFragment };

export type GroupsQueryVariables = {};


export type GroupsQuery = { groups: Array<GroupFragment> };

export type DeleteGroupMutationVariables = {
  id: Scalars['String'];
};


export type DeleteGroupMutation = Pick<Mutation, 'deleteGroup'>;

export type MaterialFragment = Pick<Material, 'id' | 'title' | 'author' | 'type' | 'url' | 'dueDate' | 'notes'>;

export type MeetingFragment = (
  Pick<Meeting, 'id' | 'title' | 'date' | 'startMin' | 'endMin' | 'description' | 'location' | 'capacity'>
  & { group: Pick<Group, 'id' | 'name' | 'description' | 'minMenteeGradeLevel' | 'minMentorGradeLevel'>, attendingMentors?: Maybe<Array<Pick<Student, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone' | 'gradeLevel'>>>, attendingMentees: Array<Pick<Student, 'id' | 'accountType' | 'firstName' | 'lastName' | 'name' | 'email' | 'phone' | 'gradeLevel'>>, materials: Array<MaterialFragment> }
);

export type MeetingQueryVariables = {
  id: Scalars['String'];
};


export type MeetingQuery = { meeting: MeetingFragment };

export type MeetingsQueryVariables = {};


export type MeetingsQuery = { meetings: Array<MeetingFragment> };

export type CreateMeetingMutationVariables = {
  input: MeetingInput;
};


export type CreateMeetingMutation = { createMeeting: MeetingFragment };

export type UpdateMeetingMutationVariables = {
  id: Scalars['String'];
  input: MeetingInput;
};


export type UpdateMeetingMutation = { updateMeeting: MeetingFragment };

export type DeleteMeetingMutationVariables = {
  id: Scalars['String'];
};


export type DeleteMeetingMutation = Pick<Mutation, 'deleteMeeting'>;

export type JoinMeetingMutationVariables = {
  id: Scalars['String'];
};


export type JoinMeetingMutation = { joinMeeting: MeetingFragment };

export type LeaveMeetingMutationVariables = {
  id: Scalars['String'];
};


export type LeaveMeetingMutation = { leaveMeeting: MeetingFragment };

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

export const MaterialFragmentDoc = gql`
    fragment Material on Material {
  id
  title
  author
  type
  url
  dueDate
  notes
}
    `;
export const MeetingFragmentDoc = gql`
    fragment Meeting on Meeting {
  id
  title
  date
  startMin
  endMin
  description
  location
  capacity
  group {
    id
    name
    description
    minMenteeGradeLevel
    minMentorGradeLevel
  }
  attendingMentors {
    id
    accountType
    firstName
    lastName
    name
    email
    phone
    gradeLevel
  }
  attendingMentees {
    id
    accountType
    firstName
    lastName
    name
    email
    phone
    gradeLevel
  }
  materials {
    ...Material
  }
}
    ${MaterialFragmentDoc}`;
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
  meetings {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export const GroupFragmentDoc = gql`
    fragment Group on Group {
  id
  name
  description
  minMenteeGradeLevel
  minMentorGradeLevel
  mentors {
    id
    accountType
    name
    email
  }
  mentees {
    id
    accountType
    name
    email
  }
  meetings {
    id
  }
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
export const CreateGroupDocument = gql`
    mutation CreateGroup($input: GroupInput!) {
  createGroup(input: $input) {
    id
    name
    description
    minMenteeGradeLevel
    minMentorGradeLevel
  }
}
    `;
export type CreateGroupMutationFn = ApolloReactCommon.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;
export type CreateGroupComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateGroupMutation, CreateGroupMutationVariables>, 'mutation'>;

    export const CreateGroupComponent = (props: CreateGroupComponentProps) => (
      <ApolloReactComponents.Mutation<CreateGroupMutation, CreateGroupMutationVariables> mutation={CreateGroupDocument} {...props} />
    );
    
export type CreateGroupProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>
    } & TChildProps;
export function withCreateGroup<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateGroupMutation,
  CreateGroupMutationVariables,
  CreateGroupProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateGroupMutation, CreateGroupMutationVariables, CreateGroupProps<TChildProps, TDataName>>(CreateGroupDocument, {
      alias: 'createGroup',
      ...operationOptions
    });
};

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, baseOptions);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = ApolloReactCommon.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const EditGroupDocument = gql`
    mutation EditGroup($id: String!, $input: GroupInput!) {
  editGroup(id: $id, input: $input) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type EditGroupMutationFn = ApolloReactCommon.MutationFunction<EditGroupMutation, EditGroupMutationVariables>;
export type EditGroupComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<EditGroupMutation, EditGroupMutationVariables>, 'mutation'>;

    export const EditGroupComponent = (props: EditGroupComponentProps) => (
      <ApolloReactComponents.Mutation<EditGroupMutation, EditGroupMutationVariables> mutation={EditGroupDocument} {...props} />
    );
    
export type EditGroupProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<EditGroupMutation, EditGroupMutationVariables>
    } & TChildProps;
export function withEditGroup<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  EditGroupMutation,
  EditGroupMutationVariables,
  EditGroupProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, EditGroupMutation, EditGroupMutationVariables, EditGroupProps<TChildProps, TDataName>>(EditGroupDocument, {
      alias: 'editGroup',
      ...operationOptions
    });
};

/**
 * __useEditGroupMutation__
 *
 * To run a mutation, you first call `useEditGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editGroupMutation, { data, loading, error }] = useEditGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditGroupMutation, EditGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<EditGroupMutation, EditGroupMutationVariables>(EditGroupDocument, baseOptions);
      }
export type EditGroupMutationHookResult = ReturnType<typeof useEditGroupMutation>;
export type EditGroupMutationResult = ApolloReactCommon.MutationResult<EditGroupMutation>;
export type EditGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<EditGroupMutation, EditGroupMutationVariables>;
export const JoinGroupMenteeDocument = gql`
    mutation JoinGroupMentee($id: String!) {
  joinGroupMentee(id: $id) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type JoinGroupMenteeMutationFn = ApolloReactCommon.MutationFunction<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables>;
export type JoinGroupMenteeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables>, 'mutation'>;

    export const JoinGroupMenteeComponent = (props: JoinGroupMenteeComponentProps) => (
      <ApolloReactComponents.Mutation<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables> mutation={JoinGroupMenteeDocument} {...props} />
    );
    
export type JoinGroupMenteeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables>
    } & TChildProps;
export function withJoinGroupMentee<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  JoinGroupMenteeMutation,
  JoinGroupMenteeMutationVariables,
  JoinGroupMenteeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables, JoinGroupMenteeProps<TChildProps, TDataName>>(JoinGroupMenteeDocument, {
      alias: 'joinGroupMentee',
      ...operationOptions
    });
};

/**
 * __useJoinGroupMenteeMutation__
 *
 * To run a mutation, you first call `useJoinGroupMenteeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMenteeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMenteeMutation, { data, loading, error }] = useJoinGroupMenteeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinGroupMenteeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables>(JoinGroupMenteeDocument, baseOptions);
      }
export type JoinGroupMenteeMutationHookResult = ReturnType<typeof useJoinGroupMenteeMutation>;
export type JoinGroupMenteeMutationResult = ApolloReactCommon.MutationResult<JoinGroupMenteeMutation>;
export type JoinGroupMenteeMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGroupMenteeMutation, JoinGroupMenteeMutationVariables>;
export const JoinGroupMentorDocument = gql`
    mutation JoinGroupMentor($id: String!) {
  joinGroupMentor(id: $id) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type JoinGroupMentorMutationFn = ApolloReactCommon.MutationFunction<JoinGroupMentorMutation, JoinGroupMentorMutationVariables>;
export type JoinGroupMentorComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<JoinGroupMentorMutation, JoinGroupMentorMutationVariables>, 'mutation'>;

    export const JoinGroupMentorComponent = (props: JoinGroupMentorComponentProps) => (
      <ApolloReactComponents.Mutation<JoinGroupMentorMutation, JoinGroupMentorMutationVariables> mutation={JoinGroupMentorDocument} {...props} />
    );
    
export type JoinGroupMentorProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<JoinGroupMentorMutation, JoinGroupMentorMutationVariables>
    } & TChildProps;
export function withJoinGroupMentor<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  JoinGroupMentorMutation,
  JoinGroupMentorMutationVariables,
  JoinGroupMentorProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, JoinGroupMentorMutation, JoinGroupMentorMutationVariables, JoinGroupMentorProps<TChildProps, TDataName>>(JoinGroupMentorDocument, {
      alias: 'joinGroupMentor',
      ...operationOptions
    });
};

/**
 * __useJoinGroupMentorMutation__
 *
 * To run a mutation, you first call `useJoinGroupMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinGroupMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinGroupMentorMutation, { data, loading, error }] = useJoinGroupMentorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinGroupMentorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGroupMentorMutation, JoinGroupMentorMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinGroupMentorMutation, JoinGroupMentorMutationVariables>(JoinGroupMentorDocument, baseOptions);
      }
export type JoinGroupMentorMutationHookResult = ReturnType<typeof useJoinGroupMentorMutation>;
export type JoinGroupMentorMutationResult = ApolloReactCommon.MutationResult<JoinGroupMentorMutation>;
export type JoinGroupMentorMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGroupMentorMutation, JoinGroupMentorMutationVariables>;
export const LeaveGroupMenteeDocument = gql`
    mutation LeaveGroupMentee($id: String!) {
  leaveGroupMentee(id: $id) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type LeaveGroupMenteeMutationFn = ApolloReactCommon.MutationFunction<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables>;
export type LeaveGroupMenteeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables>, 'mutation'>;

    export const LeaveGroupMenteeComponent = (props: LeaveGroupMenteeComponentProps) => (
      <ApolloReactComponents.Mutation<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables> mutation={LeaveGroupMenteeDocument} {...props} />
    );
    
export type LeaveGroupMenteeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables>
    } & TChildProps;
export function withLeaveGroupMentee<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LeaveGroupMenteeMutation,
  LeaveGroupMenteeMutationVariables,
  LeaveGroupMenteeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables, LeaveGroupMenteeProps<TChildProps, TDataName>>(LeaveGroupMenteeDocument, {
      alias: 'leaveGroupMentee',
      ...operationOptions
    });
};

/**
 * __useLeaveGroupMenteeMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMenteeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMenteeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMenteeMutation, { data, loading, error }] = useLeaveGroupMenteeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveGroupMenteeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables>(LeaveGroupMenteeDocument, baseOptions);
      }
export type LeaveGroupMenteeMutationHookResult = ReturnType<typeof useLeaveGroupMenteeMutation>;
export type LeaveGroupMenteeMutationResult = ApolloReactCommon.MutationResult<LeaveGroupMenteeMutation>;
export type LeaveGroupMenteeMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveGroupMenteeMutation, LeaveGroupMenteeMutationVariables>;
export const LeaveGroupMentorDocument = gql`
    mutation LeaveGroupMentor($id: String!) {
  leaveGroupMentor(id: $id) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type LeaveGroupMentorMutationFn = ApolloReactCommon.MutationFunction<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables>;
export type LeaveGroupMentorComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables>, 'mutation'>;

    export const LeaveGroupMentorComponent = (props: LeaveGroupMentorComponentProps) => (
      <ApolloReactComponents.Mutation<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables> mutation={LeaveGroupMentorDocument} {...props} />
    );
    
export type LeaveGroupMentorProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables>
    } & TChildProps;
export function withLeaveGroupMentor<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LeaveGroupMentorMutation,
  LeaveGroupMentorMutationVariables,
  LeaveGroupMentorProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables, LeaveGroupMentorProps<TChildProps, TDataName>>(LeaveGroupMentorDocument, {
      alias: 'leaveGroupMentor',
      ...operationOptions
    });
};

/**
 * __useLeaveGroupMentorMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMentorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMentorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMentorMutation, { data, loading, error }] = useLeaveGroupMentorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveGroupMentorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables>(LeaveGroupMentorDocument, baseOptions);
      }
export type LeaveGroupMentorMutationHookResult = ReturnType<typeof useLeaveGroupMentorMutation>;
export type LeaveGroupMentorMutationResult = ApolloReactCommon.MutationResult<LeaveGroupMentorMutation>;
export type LeaveGroupMentorMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveGroupMentorMutation, LeaveGroupMentorMutationVariables>;
export const GroupDocument = gql`
    query Group($id: String!) {
  group(id: $id) {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type GroupComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GroupQuery, GroupQueryVariables>, 'query'> & ({ variables: GroupQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GroupComponent = (props: GroupComponentProps) => (
      <ApolloReactComponents.Query<GroupQuery, GroupQueryVariables> query={GroupDocument} {...props} />
    );
    
export type GroupProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GroupQuery, GroupQueryVariables>
    } & TChildProps;
export function withGroup<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GroupQuery,
  GroupQueryVariables,
  GroupProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GroupQuery, GroupQueryVariables, GroupProps<TChildProps, TDataName>>(GroupDocument, {
      alias: 'group',
      ...operationOptions
    });
};

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        return ApolloReactHooks.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
      }
export function useGroupLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = ApolloReactCommon.QueryResult<GroupQuery, GroupQueryVariables>;
export const GroupsDocument = gql`
    query Groups {
  groups {
    ...Group
  }
}
    ${GroupFragmentDoc}`;
export type GroupsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GroupsQuery, GroupsQueryVariables>, 'query'>;

    export const GroupsComponent = (props: GroupsComponentProps) => (
      <ApolloReactComponents.Query<GroupsQuery, GroupsQueryVariables> query={GroupsDocument} {...props} />
    );
    
export type GroupsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GroupsQuery, GroupsQueryVariables>
    } & TChildProps;
export function withGroups<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GroupsQuery,
  GroupsQueryVariables,
  GroupsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GroupsQuery, GroupsQueryVariables, GroupsProps<TChildProps, TDataName>>(GroupsDocument, {
      alias: 'groups',
      ...operationOptions
    });
};

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
      }
export function useGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, baseOptions);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = ApolloReactCommon.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const DeleteGroupDocument = gql`
    mutation DeleteGroup($id: String!) {
  deleteGroup(id: $id)
}
    `;
export type DeleteGroupMutationFn = ApolloReactCommon.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;
export type DeleteGroupComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteGroupMutation, DeleteGroupMutationVariables>, 'mutation'>;

    export const DeleteGroupComponent = (props: DeleteGroupComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteGroupMutation, DeleteGroupMutationVariables> mutation={DeleteGroupDocument} {...props} />
    );
    
export type DeleteGroupProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>
    } & TChildProps;
export function withDeleteGroup<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteGroupMutation,
  DeleteGroupMutationVariables,
  DeleteGroupProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteGroupMutation, DeleteGroupMutationVariables, DeleteGroupProps<TChildProps, TDataName>>(DeleteGroupDocument, {
      alias: 'deleteGroup',
      ...operationOptions
    });
};

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, baseOptions);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = ApolloReactCommon.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const MeetingDocument = gql`
    query Meeting($id: String!) {
  meeting(id: $id) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type MeetingComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeetingQuery, MeetingQueryVariables>, 'query'> & ({ variables: MeetingQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const MeetingComponent = (props: MeetingComponentProps) => (
      <ApolloReactComponents.Query<MeetingQuery, MeetingQueryVariables> query={MeetingDocument} {...props} />
    );
    
export type MeetingProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeetingQuery, MeetingQueryVariables>
    } & TChildProps;
export function withMeeting<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeetingQuery,
  MeetingQueryVariables,
  MeetingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeetingQuery, MeetingQueryVariables, MeetingProps<TChildProps, TDataName>>(MeetingDocument, {
      alias: 'meeting',
      ...operationOptions
    });
};

/**
 * __useMeetingQuery__
 *
 * To run a query within a React component, call `useMeetingQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMeetingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeetingQuery, MeetingQueryVariables>) {
        return ApolloReactHooks.useQuery<MeetingQuery, MeetingQueryVariables>(MeetingDocument, baseOptions);
      }
export function useMeetingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeetingQuery, MeetingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeetingQuery, MeetingQueryVariables>(MeetingDocument, baseOptions);
        }
export type MeetingQueryHookResult = ReturnType<typeof useMeetingQuery>;
export type MeetingLazyQueryHookResult = ReturnType<typeof useMeetingLazyQuery>;
export type MeetingQueryResult = ApolloReactCommon.QueryResult<MeetingQuery, MeetingQueryVariables>;
export const MeetingsDocument = gql`
    query Meetings {
  meetings {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type MeetingsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeetingsQuery, MeetingsQueryVariables>, 'query'>;

    export const MeetingsComponent = (props: MeetingsComponentProps) => (
      <ApolloReactComponents.Query<MeetingsQuery, MeetingsQueryVariables> query={MeetingsDocument} {...props} />
    );
    
export type MeetingsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeetingsQuery, MeetingsQueryVariables>
    } & TChildProps;
export function withMeetings<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeetingsQuery,
  MeetingsQueryVariables,
  MeetingsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeetingsQuery, MeetingsQueryVariables, MeetingsProps<TChildProps, TDataName>>(MeetingsDocument, {
      alias: 'meetings',
      ...operationOptions
    });
};

/**
 * __useMeetingsQuery__
 *
 * To run a query within a React component, call `useMeetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeetingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeetingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeetingsQuery, MeetingsQueryVariables>) {
        return ApolloReactHooks.useQuery<MeetingsQuery, MeetingsQueryVariables>(MeetingsDocument, baseOptions);
      }
export function useMeetingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeetingsQuery, MeetingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeetingsQuery, MeetingsQueryVariables>(MeetingsDocument, baseOptions);
        }
export type MeetingsQueryHookResult = ReturnType<typeof useMeetingsQuery>;
export type MeetingsLazyQueryHookResult = ReturnType<typeof useMeetingsLazyQuery>;
export type MeetingsQueryResult = ApolloReactCommon.QueryResult<MeetingsQuery, MeetingsQueryVariables>;
export const CreateMeetingDocument = gql`
    mutation CreateMeeting($input: MeetingInput!) {
  createMeeting(input: $input) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type CreateMeetingMutationFn = ApolloReactCommon.MutationFunction<CreateMeetingMutation, CreateMeetingMutationVariables>;
export type CreateMeetingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateMeetingMutation, CreateMeetingMutationVariables>, 'mutation'>;

    export const CreateMeetingComponent = (props: CreateMeetingComponentProps) => (
      <ApolloReactComponents.Mutation<CreateMeetingMutation, CreateMeetingMutationVariables> mutation={CreateMeetingDocument} {...props} />
    );
    
export type CreateMeetingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<CreateMeetingMutation, CreateMeetingMutationVariables>
    } & TChildProps;
export function withCreateMeeting<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateMeetingMutation,
  CreateMeetingMutationVariables,
  CreateMeetingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateMeetingMutation, CreateMeetingMutationVariables, CreateMeetingProps<TChildProps, TDataName>>(CreateMeetingDocument, {
      alias: 'createMeeting',
      ...operationOptions
    });
};

/**
 * __useCreateMeetingMutation__
 *
 * To run a mutation, you first call `useCreateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeetingMutation, { data, loading, error }] = useCreateMeetingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMeetingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMeetingMutation, CreateMeetingMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument, baseOptions);
      }
export type CreateMeetingMutationHookResult = ReturnType<typeof useCreateMeetingMutation>;
export type CreateMeetingMutationResult = ApolloReactCommon.MutationResult<CreateMeetingMutation>;
export type CreateMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateMeetingMutation, CreateMeetingMutationVariables>;
export const UpdateMeetingDocument = gql`
    mutation UpdateMeeting($id: String!, $input: MeetingInput!) {
  updateMeeting(id: $id, input: $input) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type UpdateMeetingMutationFn = ApolloReactCommon.MutationFunction<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export type UpdateMeetingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>, 'mutation'>;

    export const UpdateMeetingComponent = (props: UpdateMeetingComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMeetingMutation, UpdateMeetingMutationVariables> mutation={UpdateMeetingDocument} {...props} />
    );
    
export type UpdateMeetingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateMeetingMutation, UpdateMeetingMutationVariables>
    } & TChildProps;
export function withUpdateMeeting<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMeetingMutation,
  UpdateMeetingMutationVariables,
  UpdateMeetingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMeetingMutation, UpdateMeetingMutationVariables, UpdateMeetingProps<TChildProps, TDataName>>(UpdateMeetingDocument, {
      alias: 'updateMeeting',
      ...operationOptions
    });
};

/**
 * __useUpdateMeetingMutation__
 *
 * To run a mutation, you first call `useUpdateMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeetingMutation, { data, loading, error }] = useUpdateMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeetingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateMeetingMutation, UpdateMeetingMutationVariables>(UpdateMeetingDocument, baseOptions);
      }
export type UpdateMeetingMutationHookResult = ReturnType<typeof useUpdateMeetingMutation>;
export type UpdateMeetingMutationResult = ApolloReactCommon.MutationResult<UpdateMeetingMutation>;
export type UpdateMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateMeetingMutation, UpdateMeetingMutationVariables>;
export const DeleteMeetingDocument = gql`
    mutation DeleteMeeting($id: String!) {
  deleteMeeting(id: $id)
}
    `;
export type DeleteMeetingMutationFn = ApolloReactCommon.MutationFunction<DeleteMeetingMutation, DeleteMeetingMutationVariables>;
export type DeleteMeetingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>, 'mutation'>;

    export const DeleteMeetingComponent = (props: DeleteMeetingComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMeetingMutation, DeleteMeetingMutationVariables> mutation={DeleteMeetingDocument} {...props} />
    );
    
export type DeleteMeetingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteMeetingMutation, DeleteMeetingMutationVariables>
    } & TChildProps;
export function withDeleteMeeting<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteMeetingMutation,
  DeleteMeetingMutationVariables,
  DeleteMeetingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteMeetingMutation, DeleteMeetingMutationVariables, DeleteMeetingProps<TChildProps, TDataName>>(DeleteMeetingDocument, {
      alias: 'deleteMeeting',
      ...operationOptions
    });
};

/**
 * __useDeleteMeetingMutation__
 *
 * To run a mutation, you first call `useDeleteMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeetingMutation, { data, loading, error }] = useDeleteMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMeetingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteMeetingMutation, DeleteMeetingMutationVariables>(DeleteMeetingDocument, baseOptions);
      }
export type DeleteMeetingMutationHookResult = ReturnType<typeof useDeleteMeetingMutation>;
export type DeleteMeetingMutationResult = ApolloReactCommon.MutationResult<DeleteMeetingMutation>;
export type DeleteMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteMeetingMutation, DeleteMeetingMutationVariables>;
export const JoinMeetingDocument = gql`
    mutation JoinMeeting($id: String!) {
  joinMeeting(id: $id) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type JoinMeetingMutationFn = ApolloReactCommon.MutationFunction<JoinMeetingMutation, JoinMeetingMutationVariables>;
export type JoinMeetingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<JoinMeetingMutation, JoinMeetingMutationVariables>, 'mutation'>;

    export const JoinMeetingComponent = (props: JoinMeetingComponentProps) => (
      <ApolloReactComponents.Mutation<JoinMeetingMutation, JoinMeetingMutationVariables> mutation={JoinMeetingDocument} {...props} />
    );
    
export type JoinMeetingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<JoinMeetingMutation, JoinMeetingMutationVariables>
    } & TChildProps;
export function withJoinMeeting<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  JoinMeetingMutation,
  JoinMeetingMutationVariables,
  JoinMeetingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, JoinMeetingMutation, JoinMeetingMutationVariables, JoinMeetingProps<TChildProps, TDataName>>(JoinMeetingDocument, {
      alias: 'joinMeeting',
      ...operationOptions
    });
};

/**
 * __useJoinMeetingMutation__
 *
 * To run a mutation, you first call `useJoinMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMeetingMutation, { data, loading, error }] = useJoinMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinMeetingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinMeetingMutation, JoinMeetingMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinMeetingMutation, JoinMeetingMutationVariables>(JoinMeetingDocument, baseOptions);
      }
export type JoinMeetingMutationHookResult = ReturnType<typeof useJoinMeetingMutation>;
export type JoinMeetingMutationResult = ApolloReactCommon.MutationResult<JoinMeetingMutation>;
export type JoinMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinMeetingMutation, JoinMeetingMutationVariables>;
export const LeaveMeetingDocument = gql`
    mutation LeaveMeeting($id: String!) {
  leaveMeeting(id: $id) {
    ...Meeting
  }
}
    ${MeetingFragmentDoc}`;
export type LeaveMeetingMutationFn = ApolloReactCommon.MutationFunction<LeaveMeetingMutation, LeaveMeetingMutationVariables>;
export type LeaveMeetingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LeaveMeetingMutation, LeaveMeetingMutationVariables>, 'mutation'>;

    export const LeaveMeetingComponent = (props: LeaveMeetingComponentProps) => (
      <ApolloReactComponents.Mutation<LeaveMeetingMutation, LeaveMeetingMutationVariables> mutation={LeaveMeetingDocument} {...props} />
    );
    
export type LeaveMeetingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LeaveMeetingMutation, LeaveMeetingMutationVariables>
    } & TChildProps;
export function withLeaveMeeting<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LeaveMeetingMutation,
  LeaveMeetingMutationVariables,
  LeaveMeetingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LeaveMeetingMutation, LeaveMeetingMutationVariables, LeaveMeetingProps<TChildProps, TDataName>>(LeaveMeetingDocument, {
      alias: 'leaveMeeting',
      ...operationOptions
    });
};

/**
 * __useLeaveMeetingMutation__
 *
 * To run a mutation, you first call `useLeaveMeetingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveMeetingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveMeetingMutation, { data, loading, error }] = useLeaveMeetingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveMeetingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LeaveMeetingMutation, LeaveMeetingMutationVariables>) {
        return ApolloReactHooks.useMutation<LeaveMeetingMutation, LeaveMeetingMutationVariables>(LeaveMeetingDocument, baseOptions);
      }
export type LeaveMeetingMutationHookResult = ReturnType<typeof useLeaveMeetingMutation>;
export type LeaveMeetingMutationResult = ApolloReactCommon.MutationResult<LeaveMeetingMutation>;
export type LeaveMeetingMutationOptions = ApolloReactCommon.BaseMutationOptions<LeaveMeetingMutation, LeaveMeetingMutationVariables>;
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