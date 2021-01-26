const timerLength: number = 1200;

function getMember() {
  const memberInLocalStorage: string = window.localStorage.getItem('member') || '';
  if (!memberInLocalStorage) return null;

  if (!window.localStorage.getItem('token')) {
    window.localStorage.removeItem('member');
    return null;
  }

  try {
    const member: any = JSON.parse(atob(memberInLocalStorage));
    const issuedSeconds: number = isNaN(member.issuedSeconds) ? 0 : member.issuedSeconds; // Convert from string to number
    const secondsSinceSignIn: number = Number(Math.floor(new Date().getTime() / 1000) - issuedSeconds);
    const sessionSecondsRemaining: Number = Number(timerLength - secondsSinceSignIn);
    member.sessionSecondsRemaining = sessionSecondsRemaining;

    if (sessionSecondsRemaining <= 0) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('member');
      return null;
    }

    return member;
  } catch (err) {
    // Local storage has been tampered with
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('member');
    return null;
  }
}

function setMember(member: any) {
  if (member === null || typeof member === 'undefined') {
    member = {};
    return;
  }

  const existingMember: any = getMember();
  if (member === null || typeof member === 'undefined') {
    if (existingMember === null || typeof existingMember === 'undefined') {
      return null;
    }
  }

  if (member.memberKey === null || typeof member.memberKey === 'undefined') {
    member.memberKey = existingMember.memberKey;
  }

  if (member.firstName === null || typeof member.firstName === 'undefined') {
    member.firstName = existingMember.firstName;
  }

  if (member.lastName === null || typeof member.lastName === 'undefined') {
    member.lastName = existingMember.lastName;
  }

  if (member.memberKey !== null && typeof member.memberKey !== 'undefined') {
    window.localStorage.setItem(
      'member',
      window.btoa(
        JSON.stringify({
          memberKey: member.memberKey,
          firstName: member.firstName,
          lastName: member.lastName,
          issuedSeconds: Math.floor(new Date().getTime() / 1000),
        })
      )
    );
  }
}

function extendSession(resp: any) {
  const token: string = resp.headers.get('token') || '';

  if (token && token.indexOf('Bearer ') >= 0) {
    const formattedToken: string = token.split('Bearer ')[1];
    window.localStorage.setItem('token', formattedToken);

    const memberInLocalStorage: any = window.localStorage.getItem('member');

    if (memberInLocalStorage) {
      const member: any = JSON.parse(atob(memberInLocalStorage));
      if (member === null) return;

      window.localStorage.setItem(
        'member',
        window.btoa(
          JSON.stringify({
            memberKey: member.memberKey,
            firstName: member.firstName,
            lastName: member.lastName,
            issuedSeconds: Math.floor(new Date().getTime() / 1000),
          })
        )
      );
    }
  }
}

const extendSlidingExpiration = () => {
  const memberInLocalStorage: any = window.localStorage.getItem('member');
  if (!memberInLocalStorage) return 0;

  if (memberInLocalStorage) {
    const member: any = JSON.parse(atob(memberInLocalStorage));
    window.localStorage.setItem(
      'member',
      window.btoa(
        JSON.stringify({
          memberKey: member.memberKey,
          firstName: member.firstName,
          lastName: member.lastName,
          issuedSeconds: Math.floor(new Date().getTime() / 1000),
        })
      )
    );
  }

  return timerLength;
};

function signOut() {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('member');
}

function getPage() {
  let url: string = window.location.href.replace('http://', '').replace('https://', '');
  if (url.indexOf('/') >= 0) {
    const tempUrl: string[] = url.split('/');
    url = '';
    for (let i = 1; i < tempUrl.length; i++) {
      url += `/${tempUrl[i]}`;
    }
  }
  if (url === '/') url = '';
  return url;
}

function getQuery() {
  let url: string = window.location.href;
  const query: any = {};
  url = url.replace(/[?]+/gi, '?'); // replace multiple consecutive question marks with a single question mark
  url = url.replace(/[=]+/gi, '='); // replace multiple consecutive equals signs with a single question mark
  url = url.replace(/[&]+/gi, '&'); // replace multiple consecutive ampersands with a single question mark
  if (url.indexOf('?') >= 0) {
    if (url.indexOf('&') < 0) url = `${url}&`;
    const queryString: string[] = url.split('?')[1].split('&');
    let keyValue: string[];
    queryString.forEach((paramAndValue) => {
      if (paramAndValue !== '') {
        if (paramAndValue.indexOf('=') >= 0) {
          keyValue = paramAndValue.split('=');
          if (keyValue[0].trim() !== '') {
            query[keyValue[0]] = keyValue[1];
          }
        } else {
          query[paramAndValue] = true;
        }
      }
    });
  } else {
    return null;
  }
  return query;
}

function setToken(headerToken: string) {
  if (headerToken) {
    if (headerToken.indexOf('Bearer ') >= 0) {
      const token = headerToken.split('Bearer ')[1];
      return window.localStorage.setItem('token', token);
    }
  }
}

export { setMember, getMember, extendSession, extendSlidingExpiration, getQuery, getPage, setToken, signOut };
