export const authHandler = async (event, _context) => {
    console.log(event);

    const token = event?.headers?.authorization;

    console.log(token);
    console.log(event.routeArn);

    let policy;
    
    if (!token) {
        policy = generatePolicy(false, event);
    } else {
        policy = generatePolicy(true, event);
    }

    console.log(policy);
    return policy;
}

const generatePolicy = (allow: boolean, event) => {
    return {
        principalId: 'token',
        policyDocument: {
            Version: '2012-10-17',
            Statement: {
                Action: 'execute-api:Invoke',
                Effect: allow ? 'Allow' : 'Deny',
                Resource: event.routeArn,
            }
        },
        context: {
            stringKey: 'value',
            numberKey: 1,
            booleanKey: true
          },
    };
}