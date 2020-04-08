export class Error
{
  public Route: string;
  public ErrorDescription: string;
}

export class Result<T>
{
    public Objects: Array<T>;
    public Target: T;
    public Url: string;
}
