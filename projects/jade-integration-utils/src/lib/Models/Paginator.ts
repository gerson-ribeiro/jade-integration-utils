export class Error
{
  public route: string;
  public errorDescription: string;
}

export class Result<T>
{
    public objects: Array<T>;
    public target: T;
    public url: string;
}
